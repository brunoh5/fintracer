import { Session } from 'next-auth'

import { api } from '@/services/api'

interface GetProfileRequest {
	session: Session | null
}

interface GetProfileResponse {
	user: {
		id: string
		name: string
		email: string
		created_at: Date
		phone: string | null
		avatar_url: string | null
	}
}

export async function getProfile({ session }: GetProfileRequest) {
	const response = await api.get<GetProfileResponse>('/me', {
		headers: {
			Authorization: `Bearer ${session?.user}`,
		},
	})

	return response.data.user
}
