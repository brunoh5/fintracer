'use client'

import { useQuery } from '@tanstack/react-query'

import { fetchUsersTransactions } from '@/api/fetch-users-transactions'

import { Transaction } from './components/transaction'
import { TransactionListSkeleton } from './transaction-list-skeleton'

export function RevenueList() {
	const { data: transactions, isLoading: isLoadingTransactions } = useQuery({
		queryKey: ['recent-transactions', 'received'],
		queryFn: async () =>
			await fetchUsersTransactions({
				query: 'transaction_type=CREDIT&limit=5',
			}),
	})

	return (
		<div className="flex flex-1 flex-col divide-y divide-[#7c7474] pb-2">
			{isLoadingTransactions && <TransactionListSkeleton />}

			{transactions?.length === 0 && (
				<>
					<p>Nenhuma transação cadastrada</p>
				</>
			)}

			{transactions &&
				transactions.map((transaction, index) => (
					<Transaction key={index} transaction={transaction} />
				))}
		</div>
	)
}
