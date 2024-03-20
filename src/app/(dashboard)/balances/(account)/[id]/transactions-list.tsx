'use client'

import { useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'

import { fetchAccountTransactions } from '@/api/fetch-account-transactions'
import { TableBody, TableCell, TableRow } from '@/components/ui/table'
import { TransactionTypes } from '@/types'

const paymentMethods = {
	money: 'Dinheiro',
	PIX: 'Pix',
	credit_card: 'Cartão de credito',
	debit_card: 'Cartão de debito',
	bank_check: 'Cheque Bancário',
	bank_transfer: 'Transferência Bancária',
}

type Method = keyof typeof paymentMethods

export function TransactionsList({ accountId }: { accountId: string }) {
	const { data: transactions } = useQuery({
		queryKey: [accountId, 'transactions'],
		queryFn: async () => await fetchAccountTransactions({ accountId }),
	})

	return (
		<TableBody>
			{transactions?.map((transaction, index) => (
				<TableRow key={index}>
					<TableCell className="text-left">
						{format(transaction.created_at, 'dd MMM, yyyy')}
					</TableCell>
					<TableCell className="text-center">
						{
							TransactionTypes[
								transaction.transaction_type as keyof typeof TransactionTypes
							]
						}
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
