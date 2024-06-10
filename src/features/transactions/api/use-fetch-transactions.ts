import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import { toast } from 'sonner'
import { z } from 'zod'

import { apiClient } from '@/lib/axios-client'

interface RequestType {
	accountId?: string | null | undefined
}

interface ResponseType {
	transactions: {
		id: string
		name: string
		amountInCents: number
		created_at: string
		accountId: string
		shopName: string
		transaction_type: 'CREDIT' | 'DEBIT'
		payment_method:
			| 'MONEY'
			| 'PIX'
			| 'CREDIT_CARD'
			| 'DEBIT_CARD'
			| 'BANK_CHECK'
			| 'BANK_TRANSFER'
		category:
			| 'FOOD'
			| 'OTHERS'
			| 'HOME'
			| 'TRANSPORTATION'
			| 'ENTERTAINMENT'
			| 'SHOPPING'
	}[]
	transactionsStatus: {
		totalRevenueInCents: number
		totalExpenseInCents: number
	}
	meta: {
		pageIndex: number
		perPage: number
		totalCount: number
	}
}

export function useFetchTransactions({ accountId }: RequestType) {
	const params = useSearchParams()

	const from = params.get('from')
	const to = params.get('to')
	const name = params.get('name')
	const transaction_type = params.get('transaction_type')
	const payment_method = params.get('payment_method')
	const category = params.get('category')

	const pageIndex = z.coerce
		.number()
		.transform((page) => page - 1)
		.parse(params.get('page') ?? '1')

	const query = useQuery({
		queryKey: [
			'transactions',
			pageIndex,
			from,
			to,
			name,
			transaction_type,
			payment_method,
			category,
		],
		queryFn: async () => {
			try {
				const response = await apiClient.get<ResponseType>('/transactions', {
					params: {
						pageIndex,
						from,
						to,
						name,
						accountId,
						transaction_type:
							transaction_type === 'all' ? null : transaction_type,
						payment_method: payment_method === 'all' ? null : payment_method,
						category: category === 'all' ? null : category,
					},
				})

				return response.data
			} catch {
				toast.error('Failed to fetch transactions')
			}
		},
	})

	return query
}
