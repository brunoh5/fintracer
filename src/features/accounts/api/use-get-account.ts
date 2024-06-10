import { useQuery } from '@tanstack/react-query'

import { apiClient } from '@/lib/axios-client'

interface ResponseType {
	account: {
		id: string
		type:
			| 'CURRENT_ACCOUNT'
			| 'MACHINE_ACCOUNT'
			| 'INVESTMENT_ACCOUNT'
			| 'SAVINGS_ACCOUNT'
		bank: string
		bankImgUrl?: string
		number?: string
		balanceInCents: number
	}
}

export function useGetAccount(id?: string) {
	const query = useQuery({
		enabled: !!id,
		queryKey: ['account', { id }],
		queryFn: async () => {
			const response = await apiClient.get<ResponseType>(`/accounts/${id}`)

			return response.data
		},
	})

	return query
}
