import { api } from '@/lib/axios'

interface ForgotPasswordBody {
	email: string
}

export async function forgotPassword({ email }: ForgotPasswordBody) {
	const response = await api.post('/forgot-password', {
		email,
	})

	return response.data
}
