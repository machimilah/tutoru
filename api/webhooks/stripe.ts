import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

export const config = {
  runtime: 'edge', // Using Edge Runtime
};

export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!stripeSecretKey || !webhookSecret) {
    console.error('Missing Stripe env vars');
    return new Response('Server Configuration Error', { status: 500 });
  }

  const stripe = new Stripe(stripeSecretKey, {
    apiVersion: '2025-02-24.acacia',
    httpClient: Stripe.createFetchHttpClient(),
  });

  const signature = req.headers.get('stripe-signature');
  
  if (!signature) {
    return new Response('Missing Stripe Signature', { status: 400 });
  }

  let event: Stripe.Event;

  try {
    const rawBody = await req.text();
    event = await stripe.webhooks.constructEventAsync(rawBody, signature, webhookSecret);
  } catch (err: any) {
    console.error(`Webhook Error: ${err.message}`);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  // Handle successful payments
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session.client_reference_id || session.metadata?.userId;
    
    // Amount is in cents for USD, we add to balance as dollars
    const amountPaid = session.amount_total ? session.amount_total / 100 : 0; 
    
    if (!userId) {
      console.error('Missing User ID in session metadata');
      return new Response('Missing User ID in session metadata', { status: 400 });
    }

    if (session.payment_status === 'paid' && amountPaid > 0) {
      const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
      const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

      if (!supabaseUrl || !supabaseKey) {
        console.error('Missing Supabase Service Key');
        return new Response('Missing Supabase Service Key', { status: 500 });
      }

      const supabaseAdmin = createClient(supabaseUrl, supabaseKey);

      try {
        // We use RPC call or manual lookup and update (Edge prevents some postgres functions without RPC if not using HTTP PostgREST directly).
        // Best approach via Data API is to retrieve current balance, then add.
        // Or if you only have a pure Edge env, we can do an `rpc` or sequential calls.
        const { data: user, error: fetchError } = await supabaseAdmin
          .from('users')
          .select('wallet_balance')
          .eq('id', userId)
          .single();

        if (fetchError) {
          console.error('Error fetching user:', fetchError);
          // Insert a new row if they didn't exist or handle error natively
          return new Response('Error finding user', { status: 500 });
        }

        const currentBalance = Number(user.wallet_balance || 0);
        const newBalance = currentBalance + amountPaid;

        const { error: updateError } = await supabaseAdmin
          .from('users')
          .update({ wallet_balance: newBalance })
          .eq('id', userId);

        if (updateError) throw updateError;
        
        console.log(`Successfully credited $${amountPaid} to User ${userId}`);
      } catch (err: any) {
        console.error('Supabase Transaction Error', err);
        return new Response('Database Update Error', { status: 500 });
      }
    }
  }

  return new Response(JSON.stringify({ received: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
