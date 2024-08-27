import { api } from '@lib/axios'

interface UpdatePasswordRequest {
	currentPassword: string
	confirmPassword: string
	newPassword: string
}

export async function updatePassword(data: UpdatePasswordRequest) {
	await api.put('/me/credentials', data)
}
