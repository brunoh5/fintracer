'use client'

import { useDeleteTransaction } from '@features/transactions/api/use-delete-transaction'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Pencil, Search, Trash } from 'lucide-react'
import { useState } from 'react'

import { TransactionCategory } from '@/components/transaction-category'
import { TransactionPaymentMethod } from '@/components/transaction-payment-method'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { TableCell, TableRow } from '@/components/ui/table'
import { useOpenTransaction } from '@/features/transactions/hooks/use-open-transaction'
import { formatCurrency } from '@/lib/price-formatter'

import { TransactionDetails } from './details'

export interface TransactionTableRowProps {
	transaction: {
		id: string
		name: string
		accountId: string
		category:
			| 'FOOD'
			| 'OTHERS'
			| 'HOME'
			| 'TRANSPORTATION'
			| 'ENTERTAINMENT'
			| 'SHOPPING'
		transaction_type: string
		payment_method: TransactionPaymentMethod
		date: string
		created_at: string
		amountInCents: number
		shopName: string
	}
}

const paymentMethodsMap: Record<TransactionPaymentMethod, string> = {
	MONEY: 'Dinheiro',
	PIX: 'Pix',
	CREDIT_CARD: 'Cartão de credito',
	DEBIT_CARD: 'Cartão de debito',
	BANK_CHECK: 'Cheque bancário',
	BANK_TRANSFER: 'TED / DOC',
}

export function TransactionTableRow({ transaction }: TransactionTableRowProps) {
	const { onOpen } = useOpenTransaction()

	const [isDetailsOpen, setIsDetailsOpen] = useState(false)

	const deleteMutation = useDeleteTransaction()

	function handleDeleteTransaction(id: string) {
		deleteMutation.mutate(id)
	}

	return (
		<TableRow>
			<TableCell>
				<Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
					<DialogTrigger asChild>
						<Button variant="outline" size="xs">
							<Search className="size-3" />
							<span className="sr-only">Detalhes das transações</span>
						</Button>
					</DialogTrigger>

					<TransactionDetails
						transactionId={transaction.id}
						open={isDetailsOpen}
					/>
				</Dialog>
			</TableCell>
			<TableCell>
				<div className="flex items-center gap-2">
					<TransactionCategory category={transaction.category} />
					<span className="text-nowrap font-semibold">{transaction.name}</span>
				</div>
			</TableCell>
			<TableCell>
				{transaction.shopName ? transaction.shopName : 'Não Informado'}
			</TableCell>
			<TableCell className="text-nowrap text-center">
				{formatDistanceToNow(
					new Date(transaction.date ?? transaction.created_at),
					{
						locale: ptBR,
						addSuffix: true,
					},
				)}
			</TableCell>
			<TableCell>{paymentMethodsMap[transaction.payment_method]}</TableCell>
			<TableCell className="text-center font-semibold">
				{transaction.amountInCents >= 0 ? (
					<span className="text-emerald-500">
						+{formatCurrency(transaction.amountInCents)}
					</span>
				) : (
					<span className="text-rose-400">
						{formatCurrency(transaction.amountInCents)}
					</span>
				)}
			</TableCell>
			<TableCell>
				<Button
					variant="outline"
					size="xs"
					onClick={() => onOpen(transaction.id)}
				>
					<Pencil className="size-3" />
					<span className="sr-only">Editar transação</span>
				</Button>
			</TableCell>
			<TableCell>
				<Button
					variant="outline"
					size="xs"
					onClick={() => handleDeleteTransaction(transaction.id)}
				>
					<Trash className="size-3 text-rose-500" />
				</Button>
			</TableCell>
		</TableRow>
	)
}
