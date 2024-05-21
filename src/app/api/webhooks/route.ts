import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'

import { env } from '@/env'
import { stripe } from '@/lib/stripe'

import { saveSubscription } from '../_lib/manage-subscription'

const relevantEvents = new Set(['checkout.session.completed'])

export async function POST(req: Request) {
	const body = await req.text()
	const signature = headers().get('stripe-signature')

	if (!signature) {
		throw new Error(`Signature not exists`)
	}

	const event = stripe.webhooks.constructEvent(
		body,
		signature,
		env.NEXT_PUBLIC_STRIPE_WEBHOOK_SECRET,
	)

	if (relevantEvents.has(event.type)) {
		switch (event.type) {
			case 'checkout.session.completed':
				// eslint-disable-next-line no-case-declarations
				const checkoutSession = event.data.object as Stripe.Checkout.Session

				if (!checkoutSession.subscription || !checkoutSession.customer) {
					throw new Error('Checkout Session Subscription undefined')
				}

				await saveSubscription(
					checkoutSession.subscription?.toString(),
					checkoutSession.customer?.toString(),
					true,
				)
				break
			default:
				throw new Error('Unhandled event!')
		}
	}

	return NextResponse.json({ result: event, ok: true })
}
