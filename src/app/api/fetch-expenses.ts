import { Session } from 'next-auth'

import { api } from '@/lib/axios'

interface FetchExpensesRequest {
	session: Session | null
}

type Transaction = {
	month: number
	total: number
}

interface FetchExpensesResponse {
	metrics: {
		[key in
			| 'FOOD'
			| 'OTHERS'
			| 'HOME'
			| 'TRANSPORT'
			| 'ENTERTAINMENT'
			| 'SHOPPING']: {
			transactions: Transaction[]
			diffBetweenMonth: number
		}
	}
}

export async function fetchExpenses({ session }: FetchExpensesRequest) {
	const response = await api.get<FetchExpensesResponse>(
		'/transactions/metrics',
		{
			headers: {
				Authorization: `Bearer ${session?.user}`,
			},
		},
	)

	return response.data.metrics
}
