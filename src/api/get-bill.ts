import { apiClient } from '@/lib/axios-client'

interface FetchBillQuery {
	pageIndex?: number
	title: string | null
}

interface GetBillsResponse {
	bills: {
		id: string
		dueDate: string
		logoUrl: string
		title: string
		description: string
		lastCharge: string
		amountInCents: number
		userId: string
	}[]
	meta: {
		perPage: number
		totalCount: number
		pageIndex: number
	}
}

export async function getBill({ pageIndex, title }: FetchBillQuery) {
	const response = await apiClient.get<GetBillsResponse>('/bills', {
		params: {
			pageIndex,
			title,
		},
	})

	return response.data
}
