import { apiClient } from '@/lib/axios-client'

interface FetchBillQuery {
	pageIndex?: number
	title?: string | null
	status?: string | null
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
		paid_at: string
	}[]
	meta: {
		perPage: number
		totalCount: number
		pageIndex: number
	}
}

export async function getBill({ pageIndex, title, status }: FetchBillQuery) {
	const response = await apiClient.get<GetBillsResponse>('/bills', {
		params: {
			pageIndex,
			title,
			status,
		},
	})

	return response.data
}
