/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiClient } from '@/lib/axios-client'

export async function editTransaction(data: any) {
	const response = await apiClient.put(`/transactions/${data.id}`, data)

	return response.data.transaction
}
