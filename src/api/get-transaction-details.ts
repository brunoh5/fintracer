import { apiClient } from '@/lib/axios-client'

interface GetTransactionDetailsParams {
	transactionId: string
}

export async function getTransactionDetails({
	transactionId,
}: GetTransactionDetailsParams) {
	const response = await apiClient.get(`/transactions/${transactionId}`)

	return response.data.transaction
}
