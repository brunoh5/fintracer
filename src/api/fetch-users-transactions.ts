import { apiClient } from '@/lib/axios-client'

interface FetchUsersTransactionRequest {
	query?: string
}

export interface FetchUsersTransactionsResponse {
	id: string
	name: string
	amount: number
	created_at: string
	payment_method:
		| 'MONEY'
		| 'PIX'
		| 'CREDIT_CARD'
		| 'DEBIT_CARD'
		| 'BANK_CHECK'
		| 'BANK_TRANSFER'
	shopName: string
	transaction_type: 'CREDIT' | 'DEBIT'
	category:
		| 'FOOD'
		| 'OTHERS'
		| 'HOME'
		| 'TRANSPORTATION'
		| 'ENTERTAINMENT'
		| 'SHOPPING'
	userId: string
	accountId: string
}

export async function fetchUsersTransactions({
	query,
}: FetchUsersTransactionRequest) {
	const response = await apiClient<{
		transactions: FetchUsersTransactionsResponse[]
	}>(`/users/transactions?${query}`)

	return response.data.transactions
}
