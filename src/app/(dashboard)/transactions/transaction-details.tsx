import { useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { getTransactionDetails } from '@/api/get-transaction-details'
import { TransactionCategory } from '@/components/transaction-category'
import { TransactionPaymentMethod } from '@/components/transaction-payment-method'
import {
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'

import { TransactionDetailsSkeleton } from './transaction-details-skeleton'

interface TransactionsDetailsProps {
	transactionId: string
	open: boolean
}

export function TransactionDetails({
	transactionId,
	open,
}: TransactionsDetailsProps) {
	const { data: transaction, isLoading: isLoadingTransaction } = useQuery({
		queryKey: ['transaction', transactionId],
		queryFn: () => getTransactionDetails({ transactionId }),
		enabled: open,
	})

	return (
		<DialogContent>
			<DialogHeader>
				<DialogTitle>Transação</DialogTitle>
				<DialogDescription>Detalhes da transação</DialogDescription>
			</DialogHeader>

			<Table>
				{isLoadingTransaction && <TransactionDetailsSkeleton />}

				{transaction && (
					<TableBody>
						<TableRow>
							<TableCell>Nome</TableCell>
							<TableCell className="flex justify-end">
								{transaction.name}
							</TableCell>
						</TableRow>

						<TableRow>
							<TableCell>Estabelecimento</TableCell>
							<TableCell className="flex justify-end">
								{transaction.shopName}
							</TableCell>
						</TableRow>

						<TableRow>
							<TableCell>Categoria</TableCell>
							<TableCell className="flex justify-end">
								<TransactionCategory category={transaction.category} />
							</TableCell>
						</TableRow>

						<TableRow>
							<TableCell>Realizado</TableCell>
							<TableCell className="flex justify-end">
								{format(new Date(transaction.created_at), 'dd/mm/yyyy', {
									locale: ptBR,
								})}
							</TableCell>
						</TableRow>

						<TableRow>
							<TableCell>Método de pagamento</TableCell>
							<TableCell className="flex justify-end">
								<TransactionPaymentMethod
									paymentMethods={transaction.payment_method}
								/>
							</TableCell>
						</TableRow>

						<TableRow>
							<TableCell>Valor</TableCell>
							<TableCell className="flex justify-end">
								{transaction.amount.toLocaleString('pt-BR', {
									style: 'currency',
									currency: 'BRL',
								})}
							</TableCell>
						</TableRow>
					</TableBody>
				)}
			</Table>
		</DialogContent>
	)
}
