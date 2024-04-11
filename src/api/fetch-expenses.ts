import { apiClient } from '@/lib/axios-client'

interface FetchExpensesResponse {
	expenses: {
		category: string
		amount: number
		diffBetweenMonth: number
	}[]
}

export async function fetchExpenses() {
	const response = await apiClient.get<FetchExpensesResponse>(
		'/transactions/metrics',
	)

	return response.data.expenses
}
