import { apiClient } from '@/lib/axios-client'

interface GetProfileResponse {
	id: string
	name: string
	email: string
	created_at: Date
	phone: string | null
	avatar_url: string | null
}

export async function getProfile() {
	const response = await apiClient.get<{ user: GetProfileResponse }>('/me')

	return response.data.user
}
