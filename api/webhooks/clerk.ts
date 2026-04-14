import { Webhook } from 'svix';
import { createClient } from '@supabase/supabase-js';

export const config = {
  runtime: 'edge',
};

export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  // Get headers
  const svix_id = req.headers.get("svix-id");
  const svix_timestamp = req.headers.get("svix-timestamp");
  const svix_signature = req.headers.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occured -- no svix headers', {
      status: 400
    });
  }

  const payload = await req.text();
  const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;

  if (!webhookSecret) {
    return new Response('Missing webhook secret', { status: 500 });
  }

  const wh = new Webhook(webhookSecret);
  let evt: any;

  try {
    evt = wh.verify(payload, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    });
  } catch (err: any) {
    console.error('Error verifying webhook:', err.message);
    return new Response('Error occured', {
      status: 400
    });
  }

  const { id } = evt.data;
  const eventType = evt.type;

  if (eventType === 'user.created') {
    const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.error('Missing Supabase credentials');
      return new Response('Missing Supabase credentials', { status: 500 });
    }

    const supabaseAdmin = createClient(supabaseUrl, supabaseKey);

    const email = evt.data.email_addresses?.[0]?.email_address;
    const first_name = evt.data.first_name || '';
    const last_name = evt.data.last_name || '';
    const username = evt.data.username || '';

    const { error } = await supabaseAdmin.from('users').insert([
      {
        id, // Clerk user id as primary key
        email,
        username: username || `${first_name} ${last_name}`.trim(),
        created_at: new Date(evt.data.created_at).toISOString(),
      }
    ]);

    if (error) {
      console.error('Error inserting user into Supabase:', error);
      return new Response('Error inserting user', { status: 500 });
    }
  }

  return new Response(JSON.stringify({ success: true }), { 
    status: 200, 
    headers: { 'Content-Type': 'application/json' } 
  });
}
