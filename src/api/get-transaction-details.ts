import { apiClient } from '@/lib/axios-client'

interface GetTransactionDetailsParams {
	transactionId: string
}

interface GetTransactionDetailsResponse {
	transaction: {
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
