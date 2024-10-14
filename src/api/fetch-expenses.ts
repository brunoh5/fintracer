import { api } from '@/lib/axios'

interface FetchExpensesResponse {
	summaryByCategories: Record<
		string,
		{ lastMonth: number; currentMonth: number }
	>
}

export async function fetchExpenses() {
	const response = await api.get<FetchExpensesResponse>('/transactions/metrics')

	return response.data.summaryByCategories
}
