import Stripe from 'stripe'

import { env } from '@/env'

import { version } from '../../package.json'

export const stripe = new Stripe(env.STRIPE_API_KEY, {
	apiVersion: '2023-10-16',
	appInfo: {
		name: 'Fintracer',
		version,
	},
})
