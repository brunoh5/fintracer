import { apiClient } from '@/lib/axios-client'

interface GetMonthlyExpensesByYearResponse {
	month: string
	total: number
}

export async function getMonthlyExpensesByYear() {
	const response = await apiClient.get<{
		monthlyExpenses: GetMonthlyExpensesByYearResponse[]
	}>('/transactions/monthly-expenses')

	return response.data.monthlyExpenses
}
