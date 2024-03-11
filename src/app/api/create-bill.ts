import { Session } from 'next-auth'

import { api } from '@/lib/axios'

interface CreateBillRequest {
	session: Session | null
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
