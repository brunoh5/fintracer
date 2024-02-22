import { Session } from 'next-auth'

import { api } from '@/services/api'

interface GetProfileRequest {
	session: Session | null
}

export async function getProfile({ session }: GetProfileRequest) {
	const response = await api.get('/me', {
		headers: {
			Authorization: `Bearer ${session?.user}`,
		},
	})

	return response.data.user
}
