import { Session } from 'next-auth'

import { apiBackend } from '@/lib/axios-backend'

interface UpdatePasswordRequest {
	session: Session | null
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	data: any
}

export async function updatePassword({ session, data }: UpdatePasswordRequest) {
	await apiBackend.put('/me/credentials', data, {
		headers: {
			Authorization: `Bearer ${session?.access_token}`,
		},
	})
}
