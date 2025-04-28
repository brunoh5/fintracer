import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import { toast } from 'sonner'
import { z } from 'zod'

import { api } from '@/lib/axios'
import { AxiosError } from 'axios'
import type { Transaction } from '../@types/Transaction'

interface RequestType {
	accountId?: string | null | undefined
}

interface ResponseType {
	transactions: Transaction[]
	totalRevenueInCents: number
	totalExpenseInCents: number
	meta: {
		pageIndex: number
		perPage: number
		totalCount: number
	}
}

export function useFetchTransactions({ accountId }: RequestType = {}) {
	const params = useSearchParams()

	const from = params.get('from')
	const to = params.get('to')
	const name = params.get('name')
	const type = params.get('type')
	const paymentMethod = params.get('payment_method')
	const category = params.get('category')

	const pageIndex = z.coerce
		.number()
		.transform(page => page - 1)
		.parse(params.get('page') ?? '1')

	const query = useQuery({
		queryKey: [
			'transactions',
			pageIndex,
			from,
			to,
			name,
			type,
			paymentMethod,
			category,
		],
		queryFn: async () => {
			try {
				const response = await api.get<ResponseType>('/transactions', {
					params: {
						pageIndex,
						from,
						to,
						name,
						accountId,
						type: type === 'all' ? null : type,
						payment_method: paymentMethod === 'all' ? null : paymentMethod,
						category: category === 'all' ? null : category,
					},
				})

				return response.data
			} catch (err) {
				if (err instanceof AxiosError)
					toast.error('Failed to fetch transactions')
			}
		},
	})

	return query
}
