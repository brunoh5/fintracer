import { api } from '@/lib/axios'

interface UpdateProfileRequest {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	data: any
}

export async function updateProfile({ data }: UpdateProfileRequest) {
	await api.put('/me', data)
}
