import { api } from '@/lib/axios'

interface DeleteAccountRequest {
	id: string
}

export async function deleteAccount({ id }: DeleteAccountRequest) {
	await api.delete(`/accounts/${id}`)
}
