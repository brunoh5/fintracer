import Stripe from 'stripe'

import { env } from '@/env'

import details from '../../package.json'

export const stripe = new Stripe(env.STRIPE_API_KEY, {
	apiVersion: '2024-04-10',
	appInfo: {
		name: 'Fintracer',
		version: details.version,
	},
})
