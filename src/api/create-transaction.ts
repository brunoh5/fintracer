import { apiClient } from '@/lib/axios-client'
import { CategoryTypes, PaymentMethods, TransactionTypes } from '@/types'

export interface CreateTransactionBody {
	accountId: string
	name: string
	shopName?: string
	amount: number
	created_at?: Date
	transaction_type: TransactionTypes
	payment_method: PaymentMethods
	category: CategoryTypes
}

export interface CreateTransactionResponse {
	id: string
	accountId: string
	name: string
	shopName?: string
	amount: number
	transaction_type: TransactionTypes
	payment_method: PaymentMethods
	category: CategoryTypes
}

export async function createTransaction(data: CreateTransactionBody) {
	const response = await apiClient.post('/transactions', data)

	return response.data.transaction
}
