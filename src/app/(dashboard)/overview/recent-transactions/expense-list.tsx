'use client'

import { useQuery } from '@tanstack/react-query'

import { fetchUsersTransactions } from '@/api/fetch-users-transactions'

import { Transaction } from './components/transaction'
import { TransactionListSkeleton } from './transaction-list-skeleton'

export function Expenses() {
	const { data: transactions, isLoading: isLoadingTransactions } = useQuery({
		queryKey: ['recent-transactions', 'expenses'],
		queryFn: async () =>
			await fetchUsersTransactions({
				query: 'transaction_type=DEBIT&limit=5',
			}),
	})

	return (
		<div className="flex flex-1 flex-col divide-y divide-[#F3F3F3] pb-2">
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
