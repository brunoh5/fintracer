'use client'

import { useQuery } from '@tanstack/react-query'

import { fetchUsersTransactions } from '@/app/api/fetch-users-transactions'

import { Transaction } from './components/transaction'
import { TransactionListSkeleton } from './transaction-list-skeleton'

export function RevenueList() {
	const { data: transactions, isLoading } = useQuery({
		queryKey: ['recent-transactions', 'received'],
		queryFn: async () =>
			await fetchUsersTransactions({
				query: 'transaction_type=CREDIT&limit=5',
			}),
	})

	return (
		<div className="flex flex-1 flex-col divide-y divide-[#7c7474] pb-2">
			{isLoading ? (
				<TransactionListSkeleton />
			) : (
				transactions?.map((transaction) => (
					<Transaction key={transaction.id} transaction={transaction} />
				))
			)}
		</div>
	)
}
