import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { TransactionCategory } from '@/components/transaction-category'
import { TransactionPaymentMethod } from '@/components/transaction-payment-method'
import {
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import { useGetTransaction } from '@/features/transactions/api/use-get-transaction'

import { TransactionDetailsSkeleton } from './details-skeleton'

interface TransactionsDetailsProps {
	transactionId: string
	open: boolean
}

export function TransactionDetails({
	transactionId,
}: TransactionsDetailsProps) {
	const { data, isLoading } = useGetTransaction(transactionId)

	return (
		<DialogContent>
			<DialogHeader>
				<DialogTitle>Transação</DialogTitle>
				<DialogDescription>Detalhes da transação</DialogDescription>
			</DialogHeader>

			<Table>
				{isLoading && <TransactionDetailsSkeleton />}

				{data?.transaction && (
					<TableBody>
						<TableRow>
							<TableCell>Nome</TableCell>
							<TableCell className="flex justify-end">
								{data.transaction.name}
							</TableCell>
						</TableRow>

						<TableRow>
							<TableCell>Estabelecimento</TableCell>
							<TableCell className="flex justify-end">
								{data.transaction.shopName}
							</TableCell>
						</TableRow>

						<TableRow>
							<TableCell>Categoria</TableCell>
							<TableCell className="flex justify-end">
								<TransactionCategory category={data.transaction.category} />
							</TableCell>
						</TableRow>

						<TableRow>
							<TableCell>Realizado</TableCell>
							<TableCell className="flex justify-end">
								{format(new Date(data.transaction.created_at), 'dd/LL/yyyy', {
									locale: ptBR,
								})}
							</TableCell>
						</TableRow>

						<TableRow>
							<TableCell>Método de pagamento</TableCell>
							<TableCell className="flex justify-end">
								<TransactionPaymentMethod
									paymentMethods={data.transaction.payment_method}
								/>
							</TableCell>
						</TableRow>

						<TableRow>
							<TableCell>Valor</TableCell>
							<TableCell className="flex justify-end">
								{(data.transaction.amountInCents / 100).toLocaleString(
									'pt-BR',
									{
										style: 'currency',
										currency: 'BRL',
									},
								)}
							</TableCell>
						</TableRow>
					</TableBody>
				)}
			</Table>
		</DialogContent>
	)
}
