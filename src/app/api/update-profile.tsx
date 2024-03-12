import { Session } from 'next-auth'

import { apiBackend } from '@/lib/axios-backend'

interface UpdateProfileRequest {
	session: Session | null
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	data: any
}

export async function updateProfile({ session, data }: UpdateProfileRequest) {
	await apiBackend.put('/me', data, {
		headers: {
			Authorization: `Bearer ${session?.access_token}`,
		},
	})
}
