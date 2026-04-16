import Stripe from 'stripe';

export const config = {
  runtime: 'edge',
};

export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeSecretKey) {
    return new Response(JSON.stringify({ error: 'Missing STRIPE_SECRET_KEY' }), { status: 500 });
  }

  const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return new Response(JSON.stringify({ error: 'Missing Supabase config' }), { status: 500 });
  }

  const stripe = new Stripe(stripeSecretKey, {
    apiVersion: '2026-03-25.dahlia',
    httpClient: Stripe.createFetchHttpClient(),
  });

  try {
    const { sessionId } = await req.json();

    if (!sessionId) {
      return new Response(JSON.stringify({ error: 'Missing session ID' }), { status: 400 });
    }

    // Verify with Stripe that this payment is real
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== 'paid') {
      return new Response(JSON.stringify({ success: false, status: session.payment_status }), { status: 200 });
    }

    const userId = session.client_reference_id || session.metadata?.userId;
    const amountPaid = session.amount_total ? session.amount_total / 100 : 0;

    if (!userId) {
      return new Response(JSON.stringify({ error: 'No user ID in session' }), { status: 400 });
    }

    // Call the Supabase RPC function to increment wallet
    // This uses a database function that we'll create, which safely increments the balance
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
      return new Response(JSON.stringify({ error: 'Failed to update wallet: ' + errText }), { status: 500 });
    }

    return new Response(JSON.stringify({ success: true, amount: amountPaid }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    console.error('Error verifying session:', err);
    return new Response(JSON.stringify({ error: err.message || 'Internal Server Error' }), { status: 500 });
  }
}
