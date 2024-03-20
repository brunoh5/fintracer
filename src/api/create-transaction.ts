import { apiClient } from '@/lib/axios-client'
import { CategoryTypes, PaymentMethods, TransactionTypes } from '@/types'

export interface CreateTransactionBody {
	accountId: string
	name: string
	shopName?: string
	amount: string
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

export async function createTransaction({
	accountId,
	amount,
	category,
	name,
	payment_method,
	transaction_type,
	shopName,
}: CreateTransactionBody) {
	const response = await apiClient.post('/transactions', {
		accountId,
		amount,
		category,
		name,
		payment_method,
		transaction_type,
		shopName,
	})

	return response.data.transaction
}
