import { api } from '@/lib/axios'

interface DeleteTransactionResponse {
	transaction: {
		amount: number
		id: string
		transaction_type: 'DEBIT' | 'CREDIT'
	}
}

export async function deleteTransaction(id: string) {
	const response = await api.delete<DeleteTransactionResponse>(
		`/transactions/${id}/delete`
	)

	return response.data.transaction
}
