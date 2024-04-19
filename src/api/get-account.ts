import { apiClient } from '@/lib/axios-client'

interface FetchCategoriesRequest {
	id: string
}

export interface GetAccountResponse {
	id: string
	type:
		| 'CURRENT_ACCOUNT'
		| 'MACHINE_ACCOUNT'
		| 'INVESTMENT_ACCOUNT'
		| 'SAVINGS_ACCOUNT'
	bank: string
	bankImgUrl?: string
	number?: string
	balanceInCents: number
}

export async function getAccount({ id }: FetchCategoriesRequest) {
	const response = await apiClient.get<{ account: GetAccountResponse }>(
		`/accounts/${id}`,
	)

	return response.data.account
}
