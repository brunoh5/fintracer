import { apiClient } from '@/lib/axios-client'

interface UpdateProfileRequest {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	data: any
}

export async function updateProfile({ data }: UpdateProfileRequest) {
	await apiClient.put('/me', data)
}
