'use client'

import { toast } from 'sonner'

import { api } from '@/lib/api'
import { getStripeJs } from '@/lib/stripe-js'

import { Button } from './ui/button'

export function SubscribeButton() {
	async function handleSubscribe() {
		try {
			const response = await api.post('/stripe')

			const { sessionId } = response.data

			const stripe = await getStripeJs()

			await stripe?.redirectToCheckout({ sessionId })
		} catch (err) {
			toast.error('Não foi possível fazer checkout')
		}
	}

	return (
		<Button
			className="w-full"
			type="button"
			variant="secondary"
			onClick={handleSubscribe}
		>
			Assinar agora
		</Button>
	)
}
