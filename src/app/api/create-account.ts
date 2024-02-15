import { Session } from 'next-auth'

import { api } from '@/services/api'

interface CreateAccountRequest {
	session: Session | null
	data: {
		type: string
		bank: string
		number: string | ''
		initialAmount: number
	}
}

export async function createAccount({ session, data }: CreateAccountRequest) {
	const response = await api.post('/accounts', data, {
		headers: {
			Authorization: `Bearer ${session?.user}`,
		},
	})

	return response.data.account
}
