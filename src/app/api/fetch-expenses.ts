import { apiClient } from '@/lib/axios-client'

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

export async function fetchExpenses() {
	const response = await apiClient.get<FetchExpensesResponse>(
		'/transactions/metrics',
	)

	return response.data.metrics
}
