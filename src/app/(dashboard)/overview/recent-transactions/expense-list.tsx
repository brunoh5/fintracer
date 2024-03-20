'use client'

import { useQuery } from '@tanstack/react-query'

import { fetchUsersTransactions } from '@/api/fetch-users-transactions'
import { TransactionProps } from '@/types'

import { Transaction } from './components/transaction'

export function Expenses() {
	const { data: transactions } = useQuery<TransactionProps[]>({
		queryKey: ['recent-transactions', 'expenses'],
		queryFn: async () =>
			await fetchUsersTransactions({
				query: 'transaction_type=DEBIT&limit=5',
			}),
	})

	return (
		<div className="flex flex-1 flex-col divide-y divide-[#F3F3F3] pb-2">
			{transactions?.map((transaction) => (
				<Transaction key={transaction.id} transaction={transaction} />
			))}
		</div>
	)
}
