'use client'

import dayJs from 'dayjs'
import { useQuery } from '@tanstack/react-query'
import { getSession } from 'next-auth/react'

import { TableBody, TableCell, TableRow } from '@/components/ui/table'
import { api } from '@/services/api'
import { TransactionProps } from '@/types'

const transactionType = {
	sent: 'Enviada',
	received: 'Recebida',
}

const paymentMethods = {
	money: 'Dinheiro',
	PIX: 'Pix',
	credit_card: 'Cartão de credito',
	debit_card: 'Cartão de debito',
	bank_check: 'Cheque Bancário',
	bank_transfer: 'Transferência Bancária',
}

type Type = keyof typeof transactionType
type Method = keyof typeof paymentMethods

export function TransactionsList({ accountId }: { accountId: string }) {
	const { data: transactions } = useQuery<TransactionProps[]>({
		queryKey: ['account', 'transactions', accountId],
		queryFn: async () => {
			const session = await getSession()

			const response = await api.get(`/transactions/${accountId}/all`, {
				headers: {
					Authorization: `Bearer ${session?.user}`,
				},
			})

			return response.data.transactions
		},
	})

	return (
		<TableBody>
			{transactions?.map((transaction) => (
				<TableRow key={transaction.id}>
					<TableCell className="text-left">
						{dayJs(transaction.created_at).format('MMM DD YYYY')}
					</TableCell>
					<TableCell className="text-center">{transaction.status}</TableCell>
					<TableCell className="text-center">
						{transactionType[transaction.type as Type]}
					</TableCell>
					<TableCell className="text-center">
						{paymentMethods[transaction.payment_method as Method]}
					</TableCell>
					<TableCell className="text-center font-bold">
						{new Intl.NumberFormat('pt-BR', {
							style: 'currency',
							currency: 'BRL',
						}).format(transaction.amount)}
					</TableCell>
				</TableRow>
			))}
		</TableBody>
	)
}
