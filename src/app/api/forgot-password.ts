import { apiBackend } from '@/lib/axios-backend'

interface ForgotPasswordBody {
	email: string
}

export async function forgotPassword({ email }: ForgotPasswordBody) {
	const response = await apiBackend.post('/forgot-password', {
		email,
	})

	return response.data
}
