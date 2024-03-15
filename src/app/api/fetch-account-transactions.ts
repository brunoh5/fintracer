import { apiClient } from '@/lib/axios-client'
import { CategoryTypes, PaymentMethods, TransactionTypes } from '@/types'

interface FetchAccountTransactionsBody {
	accountId: string
}

interface FetchAccountTransactionsResponse {
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

export async function fetchAccountTransactions({
	accountId,
}: FetchAccountTransactionsBody) {
	const response = await apiClient.get<{
		transactions: FetchAccountTransactionsResponse[]
	}>(`/transactions/${accountId}/all`)

	return response.data.transactions
}
