import Stripe from 'stripe';

export const config = {
  runtime: 'edge', // use edge for better performance and alignment with clerk webhook
};

export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeSecretKey) {
    return new Response(JSON.stringify({ error: 'Missing STRIPE_SECRET_KEY' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const stripe = new Stripe(stripeSecretKey, {
    apiVersion: '2026-03-25.dahlia', // Latest API Version according to latest types
    httpClient: Stripe.createFetchHttpClient(),
  });

  try {
    const { amount, userId } = await req.json();

    if (!amount || !userId) {
      return new Response(JSON.stringify({ error: 'Missing amount or userId' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Amount should be in cents format for US, but we take dollars and multiply by 100
    const priceInCents = Math.round(Number(amount) * 100);

    // Provide the host URL dynamically or from env
    const host = req.headers.get('origin') || process.env.VITE_APP_URL || process.env.APP_URL || 'http://localhost:5173';

    // Create Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'TutorU Wallet Funds',
              description: 'Top up your TutorU wallet balance',
            },
            unit_amount: priceInCents,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${host}/my-profile?checkout=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${host}/my-profile?checkout=canceled`,
      metadata: {
        userId: userId,
        type: 'wallet_topup',
      },
      client_reference_id: userId,
    });

    return new Response(JSON.stringify({ url: session.url }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    console.error('Error in create-checkout:', err);
    return new Response(JSON.stringify({ error: err.message || 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
