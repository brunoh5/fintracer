import { useQuery } from '@tanstack/react-query'

import { api } from '@/lib/axios'

type ResponseType = {
	transaction: {
		id: string
		name: string
		amountInCents: number
		date: string
		created_at: string
		accountId: string
		payment_method:
			| 'MONEY'
			| 'PIX'
			| 'CREDIT_CARD'
			| 'DEBIT_CARD'
			| 'BANK_TRANSFER'
		transaction_type: 'CREDIT' | 'DEBIT'
		category:
			| 'FOOD'
			| 'OTHERS'
			| 'HOME'
			| 'TRANSPORTATION'
			| 'ENTERTAINMENT'
			| 'SHOPPING'
	}
}

export function useGetTransaction(id?: string, enabled = false) {
	const query = useQuery({
		enabled,
		queryKey: ['transaction', { id }],
		queryFn: async () => {
			const response = await api.get<ResponseType>(`/transactions/${id}`)

			return response.data
		},
	})

	return query
}
