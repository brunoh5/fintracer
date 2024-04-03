'use client'

import { useQuery } from '@tanstack/react-query'

import { fetchTransactions } from '@/api/fetch-transactions'
import { ScrollArea } from '@/components/ui/scroll-area'

import { Transaction } from './components/transaction'
import { TransactionListSkeleton } from './transaction-list-skeleton'

export function RevenueList() {
	const { data: result, isLoading: isLoadingTransactions } = useQuery({
		queryKey: ['transactions', 'CREDIT'],
		queryFn: async () =>
			await fetchTransactions({
				transaction_type: 'CREDIT',
			}),
	})

	return (
		<div className="flex flex-1 flex-col pb-2">
			{isLoadingTransactions && <TransactionListSkeleton />}

			{result?.transactions.length === 0 && (
				<div className="flex items-center justify-center">
					<p>Nenhuma transação cadastrada</p>
				</div>
			)}

			<ScrollArea className="h-[480px] divide-y divide-[#7c7474] pr-4">
				{result &&
					result.transactions.map((transaction) => (
						<Transaction key={transaction.id} transaction={transaction} />
					))}
			</ScrollArea>
		</div>
	)
}
