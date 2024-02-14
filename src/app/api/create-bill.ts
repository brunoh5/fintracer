import { Session } from 'next-auth'

import { api } from '@/services/api'

interface CreateBillRequest {
	session: Session | null
	data: any
}

export async function createBill({ session, data }: CreateBillRequest) {
	const response = await api.post('/bills', data, {
		headers: {
			Authorization: `Bearer ${session?.user}`,
		},
	})

	return response.data.bill
}
