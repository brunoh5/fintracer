import { apiClient } from '@/lib/axios-client'

interface FetchTransactionQuery {
	pageIndex?: number | null
	transaction_type?: string | null
	accountId?: string | null
}

export interface FetchTransactionsResponse {
	transactions: {
		id: string
		name: string
		amountInCents: number
		created_at: string
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

export async function fetchTransactions({
	pageIndex,
	transaction_type,
	accountId,
}: FetchTransactionQuery) {
	const response = await apiClient.get<FetchTransactionsResponse>(
		'/transactions',
		{
			params: {
				pageIndex,
				transaction_type,
				accountId,
			},
		},
	)

	return response.data
}
