import { Session } from 'next-auth'

import { apiBackend } from '@/lib/axios-backend'

interface DeleteAccountRequest {
	session: Session | null
	id: string
}

export async function deleteAccount({ session, id }: DeleteAccountRequest) {
	await apiBackend.delete(`/accounts/${id}`, {
		headers: {
			Authorization: `Bearer ${session?.access_token}`,
		},
	})
}
