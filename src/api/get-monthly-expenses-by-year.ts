import { api } from '@/lib/axios'

interface GetMonthlyExpensesByYearResponse {
	month: string
	total: number
}

export async function getMonthlyExpensesByYear() {
	const response = await api.get<{
		monthlyExpenses: GetMonthlyExpensesByYearResponse[]
	}>('/transactions/monthly-expenses')

	return response.data.monthlyExpenses
}
