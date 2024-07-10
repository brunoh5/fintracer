import { useQuery } from '@tanstack/react-query'

import { api } from '@/lib/axios'

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
			const response = await api.get<ResponseType>(`/accounts/${id}`)

			return response.data
		},
	})

	return query
}
