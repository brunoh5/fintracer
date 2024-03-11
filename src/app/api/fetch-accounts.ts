import { apiClient } from '@/lib/axios-client'

export interface FetchAccountsResponse {
	id: string
	type: string
	bank: string
	bankImgUrl?: string
	number?: string
	balance: number
}

export async function fetchAccounts() {
	const response = await apiClient.get<{ accounts: FetchAccountsResponse[] }>(
		'/accounts',
	)

	return response.data.accounts
}
