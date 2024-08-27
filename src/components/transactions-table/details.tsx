import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import {
	Car,
	Clapperboard,
	Home,
	LayoutDashboard,
	ShoppingBag,
	Utensils,
} from 'lucide-react'
import { ReactNode } from 'react'

import { TransactionPaymentMethod } from '@/components/transaction-payment-method'
import {
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import { useGetTransaction } from '@/features/transactions/api/use-get-transaction'
import { formatCurrency } from '@/lib/price-formatter'

import { TransactionDetailsSkeleton } from './details-skeleton'

interface TransactionsDetailsProps {
	transactionId: string
	open: boolean
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
								{transactionCategoryIconMap[data.transaction.category]}
							</TableCell>
						</TableRow>

						<TableRow>
							<TableCell>Realizado em</TableCell>
							<TableCell className="flex justify-end">
								{format(new Date(data.transaction.date), 'dd/LL/yyyy', {
									locale: ptBR,
								})}
							</TableCell>
						</TableRow>

						<TableRow>
							<TableCell>Criado em</TableCell>
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
								{formatCurrency(data.transaction.amountInCents)}
							</TableCell>
						</TableRow>
					</TableBody>
				)}
			</Table>
		</DialogContent>
	)
}
