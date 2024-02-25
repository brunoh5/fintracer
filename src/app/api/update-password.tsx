import { Session } from 'next-auth'

import { api } from '@/services/api'

interface UpdatePasswordRequest {
	session: Session | null
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	data: any
}

export async function updatePassword({ session, data }: UpdatePasswordRequest) {
	await api.put('/me/credentials', data, {
		headers: {
			Authorization: `Bearer ${session?.user}`,
		},
	})
}
