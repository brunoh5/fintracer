import { apiClient } from '@/lib/axios-client'

interface FetchUsersTransactionQuery {
	pageIndex?: number | null
	transaction_type: string | null
}

export interface FetchUsersTransactionsResponse {
	transactions: {
		id: string
		name: string
		amount: number
		created_at: string
		userId: string
		accountId: string
		shopName: string
		transaction_type: 'CREDIT' | 'DEBIT'
		payment_method:
			| 'MONEY'
			| 'PIX'
			| 'CREDIT_CARD'
			| 'DEBIT_CARD'
			| 'BANK_CHECK'
			| 'BANK_TRANSFER'
		category:
			| 'FOOD'
			| 'OTHERS'
			| 'HOME'
			| 'TRANSPORTATION'
			| 'ENTERTAINMENT'
			| 'SHOPPING'
	}[]
	meta: {
		pageIndex: number
		perPage: number
		totalCount: number
	}
}

export async function fetchUsersTransactions({
	pageIndex,
	transaction_type,
}: FetchUsersTransactionQuery) {
	const response = await apiClient.get<FetchUsersTransactionsResponse>(
		'/transactions',
		{
			params: {
				pageIndex,
				transaction_type,
			},
		},
	)

	return response.data
}
