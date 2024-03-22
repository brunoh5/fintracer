import { stripe } from '@/lib/stripe'

export async function fetchPrice() {
	const price = await stripe.prices.retrieve('price_1OtLjjBZQhTW9tvmeaGRRfKk', {
		expand: ['product'],
	})

	const product = {
		priceId: price.id,
		amount: price.unit_amount
			? (price.unit_amount / 100).toLocaleString('pt-BR', {
					style: 'currency',
					currency: 'BRL',
				})
			: null,
	}

	return product
}
