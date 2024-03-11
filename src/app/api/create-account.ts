import { apiClient } from '@/lib/axios-client'

interface CreateAccountBody {
	type:
		| 'CURRENT_ACCOUNT'
		| 'MACHINE_ACCOUNT'
		| 'INVESTMENT_ACCOUNT'
		| 'SAVINGS_ACCOUNT'
	bank: string
	number?: string
	initialAmount?: number
}

export interface CreateAccountResponse {
	id: string
	type:
		| 'CURRENT_ACCOUNT'
		| 'MACHINE_ACCOUNT'
		| 'INVESTMENT_ACCOUNT'
		| 'SAVINGS_ACCOUNT'
	bank: string
	number?: string
	balance: number
}

export async function createAccount({
	type,
	bank,
	number,
	initialAmount,
}: CreateAccountBody) {
	const response = await apiClient.post<{ account: CreateAccountResponse }>(
		'/accounts',
		{
			type,
			bank,
			number,
			initialAmount,
		},
	)

	return response.data.account
}
