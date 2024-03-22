'use client'

import { useQuery } from '@tanstack/react-query'

import { fetchTransactions } from '@/api/fetch-transactions'
import { ScrollArea } from '@/components/ui/scroll-area'

import { Transaction } from './components/transaction'
import { TransactionListSkeleton } from './transaction-list-skeleton'

export function TransactionsList() {
	const { data: result, isLoading: isLoadingTransactions } = useQuery({
		queryKey: ['transactions'],
		queryFn: () => fetchTransactions({}),
	})

	return (
		<div className="flex flex-1 flex-col divide-y divide-[#F3F3F3] pb-2">
			{isLoadingTransactions && <TransactionListSkeleton />}

			{result?.transactions?.length === 0 && (
				<>
					<p>Nenhuma transação cadastrada</p>
				</>
			)}

			{result && (
				<ScrollArea className="h-[480px] pr-4">
					{result.transactions.map((transaction) => (
						<Transaction key={transaction.id} transaction={transaction} />
					))}
				</ScrollArea>
			)}
		</div>
	)
}
