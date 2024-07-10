import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import { z } from 'zod'

import { api } from '@/lib/axios'

interface ResponseType {
	bills: {
		id: string
		dueDate: string
		logoUrl: string
		title: string
		description: string
		lastCharge: string
		amountInCents: number
		userId: string
		paid_at: string
	}[]
	totalInCents: number
	billsStatus: {
		notPaidInCents: number
	}
	meta: {
		perPage: number
		totalCount: number
		pageIndex: number
	}
}

export function useFetchBills() {
	const params = useSearchParams()

	const title = params.get('title')
	const status = params.get('status')

	const pageIndex = z.coerce
		.number()
		.transform((page) => page - 1)
		.parse(params.get('page') ?? '1')

	const query = useQuery({
		queryKey: ['bills', pageIndex, title, status],
		queryFn: async () => {
			const response = await api.get<ResponseType>('/bills', {
				params: {
					pageIndex,
					title,
					status: status === 'all' ? undefined : status,
				},
			})

			return response.data
		},
	})

	return query
}
