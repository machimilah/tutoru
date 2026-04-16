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
    apiVersion: '2026-03-25.dahlia',
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
      const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;

      if (!supabaseUrl || !supabaseKey) {
        console.error('Missing Supabase configuration');
        return new Response('Server Configuration Error', { status: 500 });
      }

      try {
        // Call the same RPC function used in manual verification
        const rpcRes = await fetch(`${supabaseUrl}/rest/v1/rpc/increment_wallet`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': supabaseKey,
            'Authorization': `Bearer ${supabaseKey}`,
          },
          body: JSON.stringify({
            user_id: userId,
            amount: amountPaid,
          }),
        });

        if (!rpcRes.ok) {
          const errText = await rpcRes.text();
          console.error('Supabase RPC error:', errText);
          throw new Error(errText);
        }
        
        console.log(`Successfully credited $${amountPaid} to User ${userId}`);
      } catch (err: any) {
        console.error('Balance update error:', err);
        return new Response('Database Update Error', { status: 500 });
      }
    }
  }

  return new Response(JSON.stringify({ received: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
