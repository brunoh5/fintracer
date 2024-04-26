import { apiClient } from '@/lib/axios-client'

export interface CreateBillRequest {
	title: string
	description?: string
	dueDate: Date | string
	paid_at?: Date | string
	amount: number
	period: 'monthly' | 'only' | 'anual'
}

export async function createBill(data: CreateBillRequest) {
	const response = await apiClient.post('/bills', data)

	return response.data.bill
}
