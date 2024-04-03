import { apiClient } from '@/lib/axios-client'

export interface FetchAccountsResponse {
	accounts: {
		id: string
		type:
			| 'CURRENT_ACCOUNT'
			| 'MACHINE_ACCOUNT'
			| 'INVESTMENT_ACCOUNT'
			| 'SAVINGS_ACCOUNT'
		bank: string
		bankImgUrl?: string
		number?: string
		balance: number
	}[]
	totalBalanceInCents: number
	meta: {
		pageIndex: number
		perPage: number
		totalCount: number
	}
}

export async function fetchAccounts() {
	const response = await apiClient.get<FetchAccountsResponse>('/accounts')

	return response.data
}
