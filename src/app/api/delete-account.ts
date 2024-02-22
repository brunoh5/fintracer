import { Session } from 'next-auth'

import { api } from '@/services/api'

interface DeleteAccountRequest {
	session: Session | null
	id: string
}

export async function deleteAccount({ session, id }: DeleteAccountRequest) {
	await api.delete(`/accounts/${id}`, {
		headers: {
			Authorization: `Bearer ${session?.user}`,
		},
	})
}
