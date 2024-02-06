import { Session } from 'next-auth'

import { api } from '@/services/api'

export interface CreateTransactionBody {
	session: Session | null
	data: {
		accountId: string
		name: string
		shopName?: string
		amount: number
		paid_at: Date | null
		type: string
		payment_method: string
		categoryId: string
	}
}

export async function createTransaction({
	session,
	data,
}: CreateTransactionBody) {
	const response = await api.post('/transactions', data, {
		headers: {
			Authorization: `Bearer ${session?.user}`,
		},
	})

	return response.data.transaction
}
