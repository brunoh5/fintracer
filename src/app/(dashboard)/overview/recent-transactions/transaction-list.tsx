'use client'

import { ScrollArea } from '@/components/ui/scroll-area'
import { useFetchTransactions } from '@/features/transactions/api/use-fetch-transactions'

import { Transaction } from './components/transaction'
import { TransactionListSkeleton } from './transaction-list-skeleton'

export function TransactionsList() {
	const { data, isLoading } = useFetchTransactions({})

	return (
		<div className="flex flex-1 flex-col divide-y divide-[#F3F3F3] overflow-hidden pb-2">
			{isLoading && <TransactionListSkeleton />}

			{data?.transactions?.length === 0 && (
				<>
					<p>Nenhuma transação cadastrada</p>
				</>
			)}

			{data && (
				<ScrollArea className="h-[600px] pr-4">
					{data.transactions.map((transaction) => (
						<Transaction key={transaction.id} transaction={transaction} />
					))}
				</ScrollArea>
			)}
		</div>
	)
}
