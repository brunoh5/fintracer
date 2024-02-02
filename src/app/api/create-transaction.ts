import { getServerSession } from 'next-auth'

import { api } from '@/services/api'

export interface CreateTransactionBody {
	accountId: string
	name: string
	shopName?: string
	amount: string
	paid_at: Date | null
	type: string
	payment_method: string
	categoryId: string
}

export async function createTransaction(data: CreateTransactionBody) {
	const session = await getServerSession()

	console.log(session)

	const response = await api.post('/transactions', data, {
		headers: {
			Authorization: `Bearer ${session?.user}`,
		},
	})

	return response.data.transaction
}
