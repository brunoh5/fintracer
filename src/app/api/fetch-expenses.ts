import { Session } from 'next-auth'

import { apiBackend } from '@/lib/axios-backend'

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
	const response = await apiBackend.get<FetchExpensesResponse>(
		'/transactions/metrics',
		{
			headers: {
				Authorization: `Bearer ${session?.access_token}`,
			},
		},
	)

	return response.data.metrics
}
