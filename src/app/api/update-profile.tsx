import { Session } from 'next-auth'

import { api } from '@/services/api'

interface UpdateProfileRequest {
	session: Session | null
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	data: any
}

export async function updateProfile({ session, data }: UpdateProfileRequest) {
	await api.put('/me', data, {
		headers: {
			Authorization: `Bearer ${session?.user}`,
		},
	})
}
