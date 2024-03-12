/* eslint-disable @typescript-eslint/no-explicit-any */
import Credentials from 'next-auth/providers/credentials'

import { apiBackend } from '@/lib/axios-backend'

export const credentialsProvider: any = Credentials({
	credentials: {
		email: { label: 'Username', type: 'text' },
		password: { label: 'password', type: 'password' },
	},
	async authorize(credentials) {
		const { email, password } = credentials as {
			email: string
			password: string
		}

		const response = await apiBackend.post(`/sessions`, {
			email,
			password,
		})

		const { token } = response.data

		if (!token) {
			return null
		}

		return {
			id: token,
			email,
		}
	},
})
