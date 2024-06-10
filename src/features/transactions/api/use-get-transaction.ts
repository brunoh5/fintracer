import { useQuery } from '@tanstack/react-query'

import { apiClient } from '@/lib/axios-client'

type ResponseType = {
	transaction: {
		id: string
		name: string
		amountInCents: number
		created_at: string
		accountId: string
		payment_method:
			| 'MONEY'
			| 'PIX'
			| 'CREDIT_CARD'
			| 'DEBIT_CARD'
			| 'BANK_TRANSFER'
		shopName: string
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

export function useGetTransaction(id?: string) {
	const query = useQuery({
		enabled: !!id,
		queryKey: ['transaction', { id }],
		queryFn: async () => {
			const response = await apiClient.get<ResponseType>(`/transactions/${id}`)

			return response.data
		},
	})

	return query
}
