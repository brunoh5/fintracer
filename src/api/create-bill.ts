import { Session } from 'next-auth'

import { apiBackend } from '@/lib/axios-backend'

interface CreateBillRequest {
	session: Session | null
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	data: any
}

export async function createBill({ session, data }: CreateBillRequest) {
	const response = await apiBackend.post('/bills', data, {
		headers: {
			Authorization: `Bearer ${session?.access_token}`,
		},
	})

	return response.data.bill
}
