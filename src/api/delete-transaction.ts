import { apiClient } from '@/lib/axios-client'

interface DeleteTransactionResponse {
	transaction: {
		amount: number
		id: string
		transaction_type: 'DEBIT' | 'CREDIT'
	}
}

export async function deleteTransaction(id: string) {
	const response = await apiClient.delete<DeleteTransactionResponse>(
		`/transactions/${id}/delete`,
	)

	return response.data.transaction
}
