'use client'

import { Button } from '@/components/ui/button'
import { useNewTransaction } from '@/features/transactions/hooks/use-new-transaction'

import { TransactionsList } from './transactions-list'

export default function Transactions() {
	const { onOpen } = useNewTransaction()

	return (
		<main className="flex flex-col gap-4 pb-8 pr-8 pt-4">
			<div className="flex items-center justify-between">
				<h2 className="text-[22px] text-foreground">Transações</h2>
				<Button type="button" onClick={() => onOpen()}>
					Nova transação
				</Button>
			</div>

			<TransactionsList />
		</main>
	)
}
