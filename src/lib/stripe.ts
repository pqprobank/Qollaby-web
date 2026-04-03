import Stripe from "stripe";

/** Match Stripe Dashboard API version & SDK types (supports flexible billing) */
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  typescript: true,
  apiVersion: "2026-03-25.dahlia",
});
