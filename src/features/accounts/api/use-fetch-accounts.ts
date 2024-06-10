import { useQuery } from '@tanstack/react-query'

import { apiClient } from '@/lib/axios-client'

interface ResponseType {
	accounts: {
		id: string
		type:
			| 'CURRENT_ACCOUNT'
			| 'MACHINE_ACCOUNT'
			| 'INVESTMENT_ACCOUNT'
			| 'SAVINGS_ACCOUNT'
		bank: string
		bankImgUrl?: string
		number?: string
		balance: number
	}[]
	totalBalanceInCents: number
	meta: {
		pageIndex: number
		perPage: number
		totalCount: number
	}
}

export function useFetchAccounts() {
	const query = useQuery({
		queryKey: ['accounts'],
		queryFn: async () => {
			const response = await apiClient.get<ResponseType>('/accounts')

			return response.data
		},
	})

	return query
}
