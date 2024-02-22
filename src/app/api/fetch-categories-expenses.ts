import { Session } from 'next-auth'

import { api } from '@/services/api'

interface FetchCategoriesExpensesRequest {
	session: Session | null
}

interface FetchCategoriesExpensesResponse {
	categories: {
		id: string
		name: string
		transactions: {
			month: number
			total: number
		}[]
	}[]
}

export async function fetchCategoriesExpenses({
	session,
}: FetchCategoriesExpensesRequest) {
	const response = await api.get<FetchCategoriesExpensesResponse>(
		'/categories/metrics',
		{
			headers: {
				Authorization: `Bearer ${session?.user}`,
			},
		},
	)

	return response.data.categories
}
