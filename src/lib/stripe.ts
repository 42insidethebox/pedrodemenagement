import { ENV } from './env';

export async function getStripe() {
  const key = ENV.STRIPE_SECRET_KEY;
  if (!key) {
    console.error('[stripe] STRIPE_SECRET_KEY is not set');
    return null;
  }
  try {
    // Dynamic import to avoid hard dependency at build time
    const mod = await import('stripe');
    const Stripe = (mod.default || (mod as any)) as any;
    return new Stripe(key, { apiVersion: '2024-06-20' });
  } catch (e) {
    console.error('[stripe] getStripe failed:', e instanceof Error ? e.message : String(e));
    return null;
  }
}

