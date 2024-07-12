import { api } from '@/lib/axios'

interface FetchExpensesResponse {
	metrics: {
		category: string
		amount: number
		diffBetweenMonth: number
	}[]
}

export async function fetchExpenses() {
	const response = await api.get<FetchExpensesResponse>('/transactions/metrics')

	return response.data.metrics
}
