import { apiClient } from '@/lib/axios-client'

interface DeleteAccountRequest {
	id: string
}

export async function deleteAccount({ id }: DeleteAccountRequest) {
	await apiClient.delete(`/accounts/${id}`)
}
