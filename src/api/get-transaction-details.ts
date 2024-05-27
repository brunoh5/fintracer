import { apiClient } from '@/lib/axios-client'

interface GetTransactionDetailsParams {
	transactionId: string
}

export interface GetTransactionDetailsResponse {
	transaction: {
		id: string
		name: string
		amount: number
		created_at: string
		accountId: string
		payment_method:
			| 'MONEY'
			| 'PIX'
			| 'CREDIT_CARD'
			| 'DEBIT_CARD'
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
	}
}

export async function getTransactionDetails({
	transactionId,
}: GetTransactionDetailsParams) {
	const response = await apiClient.get<GetTransactionDetailsResponse>(
		`/transactions/${transactionId}`,
	)

	return response.data.transaction
}
