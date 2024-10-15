'use client'

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@components/ui/dropdown-menu'
import { useDeleteTransaction } from '@features/transactions/api/use-delete-transaction'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import {
	Car,
	Clapperboard,
	Ellipsis,
	Home,
	LayoutDashboard,
	ShoppingBag,
	Utensils,
} from 'lucide-react'
import { type ReactNode, useState } from 'react'

import type { TransactionPaymentMethod } from '@/components/transaction-payment-method'
import { Button } from '@/components/ui/button'
import { Dialog } from '@/components/ui/dialog'
import { TableCell, TableRow } from '@/components/ui/table'
import { useOpenTransaction } from '@/features/transactions/hooks/use-open-transaction'
import { formatCurrency } from '@/utils/price-formatter'

import type { Transaction } from '@features/transactions/@types/Transaction'
import { TransactionDetails } from './details'

export interface TransactionTableRowProps {
	transaction: Transaction
}

const paymentMethodsMap: Record<TransactionPaymentMethod, string> = {
	MONEY: 'Dinheiro',
	PIX: 'Pix',
	CREDIT_CARD: 'Cartão de credito',
	DEBIT_CARD: 'Cartão de debito',
	BANK_CHECK: 'Cheque bancário',
	BANK_TRANSFER: 'TED / DOC',
}

type TransactionCategory =
	| 'FOOD'
	| 'OTHERS'
	| 'HOME'
	| 'TRANSPORTATION'
	| 'ENTERTAINMENT'
	| 'SHOPPING'

const transactionCategoryIconMap: Record<TransactionCategory, ReactNode> = {
	FOOD: <Utensils className="mx-auto size-5" />,
	TRANSPORTATION: <Car className="mx-auto size-5" />,
	ENTERTAINMENT: <Clapperboard className="mx-auto size-5" />,
	SHOPPING: <ShoppingBag className="mx-auto size-5" />,
	OTHERS: <LayoutDashboard className="mx-auto size-5" />,
	HOME: <Home className="mx-auto size-5" />,
}

export function TransactionTableRow({ transaction }: TransactionTableRowProps) {
	const { onOpen } = useOpenTransaction()

	const [isDetailsOpen, setIsDetailsOpen] = useState(false)

	const deleteMutation = useDeleteTransaction()

	function handleDeleteTransaction(id: string) {
		deleteMutation.mutate(id)
	}

	return (
		<>
			<TableRow className="text-nowrap">
				<TableCell className="border text-center capitalize">
					{transaction.date
						? format(transaction.date, 'dd MMM', { locale: ptBR })
						: 'Não Preenchido'}
				</TableCell>
				<TableCell className="border font-semibold">
					{transaction.name}
				</TableCell>
				<TableCell className="border text-center font-semibold">
					{transaction.amount >= 0 ? (
						<span className="text-emerald-500">
							{formatCurrency(transaction.amount)}
						</span>
					) : (
						<span className="text-rose-400">
							{formatCurrency(transaction.amount)}
						</span>
					)}
				</TableCell>
				<TableCell className="border text-center">{transaction.bank}</TableCell>
				<TableCell className="border text-center">
					{transactionCategoryIconMap[transaction.category]}
				</TableCell>
				<TableCell className="border text-center">
					{paymentMethodsMap[transaction.payment_method]}
				</TableCell>
				<TableCell className="border">
					<DropdownMenu>
						<DropdownMenuTrigger>
							<Button variant="outline" size="icon">
								<Ellipsis className="size-3" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuItem onClick={() => setIsDetailsOpen(true)}>
								Detalhes
							</DropdownMenuItem>
							<DropdownMenuItem onClick={() => onOpen(transaction.id)}>
								Editar
							</DropdownMenuItem>
							<DropdownMenuItem
								className="text-rose-500"
								onClick={() => handleDeleteTransaction(transaction.id)}
							>
								Deletar
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</TableCell>
			</TableRow>

			<Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
				<TransactionDetails
					transactionId={transaction.id}
					open={isDetailsOpen}
				/>
			</Dialog>
		</>
	)
}
