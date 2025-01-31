import { loadStripe } from "@stripe/stripe-js";

export const getStripeJs = () => {
  const stripePublicKey = import.meta.env.VITE_PUBLIC_STRIPE_PUBLIC_KEY;
  if (!stripePublicKey) {
    throw new Error("Missing Stripe public key");
  }
  return loadStripe(stripePublicKey);
};