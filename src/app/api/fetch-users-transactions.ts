import { apiClient } from '@/lib/axios-client'
import { CategoryTypes, PaymentMethods, TransactionTypes } from '@/types'

interface FetchUsersTransactionRequest {
	query?: string
}

export interface FetchUsersTransactionsResponse {
	id: string
	name: string
	amount: number
	created_at: Date
	payment_method: PaymentMethods
	shopName: string
	transaction_type: TransactionTypes
	category: CategoryTypes
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
