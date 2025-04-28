'use client'

import { MoveLeft } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useNewTransaction } from '@/features/transactions/hooks/use-new-transaction'

import { ManageAccount } from './manage-account'
import { TransactionsList } from './transactions-list'

export default async function Account({
	params
}: {
	params: Promise<{ id: string }>
}) {
	const { id: accountId } = await params
	const { onOpen } = useNewTransaction()

	return (
		<main className="relative flex flex-col gap-4 pb-8 pl-6 pr-8 pt-4">
			<div className="mb-2 flex items-center gap-2">
				<Link href="/balances">
					<Button
						type="button"
						className="rounded-full"
						variant="ghost"
						title="Voltar"
					>
						<MoveLeft className="size-6" />
					</Button>
				</Link>
				<h2 className="text-[22px] text-muted-foreground">Detalhes da conta</h2>
			</div>
			<Card>
				<ManageAccount accountId={accountId} />
			</Card>

			<div className="flex items-center justify-between">
				<h2 className="mb-2 text-[22px] text-muted-foreground">
					Histórico de Transações
				</h2>

				<Button onClick={() => onOpen(accountId)}>Nova transação</Button>
			</div>

			<TransactionsList accountId={accountId} />
		</main>
	)
}
