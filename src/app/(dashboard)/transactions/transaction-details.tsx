import { useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { getTransactionDetails } from '@/api/get-transaction-details'
import { TransactionCategory } from '@/components/transaction-category'
import {
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'

interface TransactionsDetailsProps {
	transactionId: string
	open: boolean
}

export function TransactionDetails({
	transactionId,
	open,
}: TransactionsDetailsProps) {
	const { data: transaction } = useQuery({
		queryKey: ['transaction', transactionId],
		queryFn: () => getTransactionDetails({ transactionId }),
		enabled: open,
	})

	console.log(transaction)

	return (
		<DialogContent>
			<DialogHeader>
				<DialogTitle>Transação</DialogTitle>
				<DialogDescription>Detalhes da transação</DialogDescription>
			</DialogHeader>

			{transaction && (
				<Table>
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
								{format(new Date(transaction.createdAt), 'DD/MM/YYYY', {
									locale: ptBR,
								})}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Metodo de pagamento</TableCell>
							<TableCell className="flex justify-end">
								{transaction.name}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Nome</TableCell>
							<TableCell className="flex justify-end">
								{transaction.name}
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			)}
		</DialogContent>
	)
}
