import { loadStripe } from '@stripe/stripe-js'

import { env } from '@/env'

export async function getStripeJs() {
	const stripeJs = await loadStripe(env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY)

	return stripeJs
}
