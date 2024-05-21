'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Pencil, Search, Trash } from 'lucide-react'
import { useState } from 'react'

import { deleteTransaction } from '@/api/delete-transaction'
import { FetchTransactionsResponse } from '@/api/fetch-transactions'
import { GetAccountResponse } from '@/api/get-account'
import { TransactionCategory } from '@/components/transaction-category'
import { TransactionPaymentMethod } from '@/components/transaction-payment-method'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { TableCell, TableRow } from '@/components/ui/table'

import { TransactionDetails } from './details'
import { EditTransaction } from './edit-transaction'

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
	const queryClient = useQueryClient()

	const [isDetailsOpen, setIsDetailsOpen] = useState(false)
	const [isEditOpen, setIsEditOpen] = useState(false)

	const { mutateAsync: deleteTransactionFn } = useMutation({
		mutationFn: deleteTransaction,
		onSuccess(data, transactionId) {
			const accountId = transaction.accountId
			const account = queryClient.getQueryData<GetAccountResponse>([
				'accounts',
				accountId,
			])

			let total = 0

			if (account) {
				if (data.transaction_type === 'DEBIT') {
					total = (account?.balanceInCents + data.amount) * 100
				}

				if (data.transaction_type === 'CREDIT') {
					total = (account?.balanceInCents - data.amount) * 100
				}

				queryClient.setQueryData(['accounts', accountId], {
					...account,
					balanceInCents: total,
				})
			}

			const accountTransactionsList =
				queryClient.getQueriesData<FetchTransactionsResponse>({
					queryKey: ['transactions', accountId],
				})

			accountTransactionsList.forEach(([cacheKey, cacheData]) => {
				if (!cacheData) {
					// eslint-disable-next-line no-useless-return
					return
				}

				const filteredTransactions = cacheData.transactions.filter(
					(transaction) => transaction.id !== transactionId,
				)

				cacheData.meta.totalCount -= 1

				queryClient.setQueryData(cacheKey, {
					...cacheData,
					transactions: filteredTransactions,
				})
			})
		},
	})

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
					<span className="font-semibold">{transaction.name}</span>
				</div>
			</TableCell>
			<TableCell>
				{transaction.shopName ? transaction.shopName : 'Não Informado'}
			</TableCell>
			<TableCell className="text-center">
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
			<TableCell>
				<Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
					<DialogTrigger asChild>
						<Button variant="outline" size="xs">
							<Pencil className="size-3" />
							<span className="sr-only">Editar transação</span>
						</Button>
					</DialogTrigger>

					<EditTransaction transactionId={transaction.id} open={isEditOpen} />
				</Dialog>
			</TableCell>
			<TableCell>
				<Button
					variant="outline"
					size="xs"
					onClick={() => deleteTransactionFn(transaction.id)}
				>
					<Trash className="size-3 text-rose-500" />
				</Button>
			</TableCell>
		</TableRow>
	)
}
