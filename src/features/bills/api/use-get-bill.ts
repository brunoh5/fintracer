import { useQuery } from '@tanstack/react-query'

import { api } from '@/lib/axios'

interface ResponseType {
	bill: {
		id: string
		dueDate: string
		logoUrl: string
		title: string
		description: string
		lastCharge: string
		amountInCents: number
		userId: string
		paid_at: string
	}
}

export function useGetBill(id?: string) {
	const query = useQuery({
		enabled: !!id,
		queryKey: ['bill', { id }],
		queryFn: async () => {
			const response = await api.get<ResponseType>(`/bills/${id}`)

			return response.data
		},
	})

	return query
}
