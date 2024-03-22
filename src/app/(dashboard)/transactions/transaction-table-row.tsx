'use client'

import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Search } from 'lucide-react'
import { useState } from 'react'

import { TransactionCategory } from '@/components/transaction-category'
import { TransactionPaymentMethod } from '@/components/transaction-payment-method'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { TableCell, TableRow } from '@/components/ui/table'

import { TransactionDetails } from './transaction-details'

export interface TransactionTableRowProps {
	transaction: {
		id: string
		name: string
		category:
			| 'FOOD'
			| 'OTHERS'
			| 'HOME'
			| 'TRANSPORTATION'
			| 'ENTERTAINMENT'
			| 'SHOPPING'
		transaction_type: string
		payment_method: TransactionPaymentMethod
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
	BANK_TRANSFER: 'Transferência bancária',
}

export function TransactionTableRow({ transaction }: TransactionTableRowProps) {
	const [isDetailsOpen, setIsDetailsOpen] = useState(false)

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
			<TableCell className="font-semibold">{transaction.name}</TableCell>
			<TableCell>
				{transaction.shopName ? transaction.shopName : 'Não Informado'}
			</TableCell>
			<TableCell>
				<TransactionCategory category={transaction.category} />
			</TableCell>
			<TableCell>
				{formatDistanceToNow(transaction.created_at, {
					locale: ptBR,
					addSuffix: true,
				})}
			</TableCell>
			<TableCell>{paymentMethodsMap[transaction.payment_method]}</TableCell>
			<TableCell className="text-center font-semibold">
				{transaction.transaction_type === 'CREDIT' && (
					<span className="text-emerald-500">
						+
						{(transaction.amountInCents / 100).toLocaleString('pt-BR', {
							style: 'currency',
							currency: 'BRL',
						})}
					</span>
				)}
				{transaction.transaction_type === 'DEBIT' && (
					<span className="text-rose-400">
						-
						{(transaction.amountInCents / 100).toLocaleString('pt-BR', {
							style: 'currency',
							currency: 'BRL',
						})}
					</span>
				)}
			</TableCell>
		</TableRow>
	)
}
