'use client'

import { useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'
import {
	Car,
	Clapperboard,
	Home,
	LayoutDashboard,
	ShoppingBag,
	Utensils,
} from 'lucide-react'

import { fetchUsersTransactions } from '@/app/api/fetch-users-transactions'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { TransactionProps } from '@/types'

const categoryIcons = {
	FOOD: <Utensils />,
	TRANSPORT: <Car />,
	ENTERTAINMENT: <Clapperboard />,
	SHOPPING: <ShoppingBag />,
	OTHERS: <LayoutDashboard />,
	HOME: <Home />,
}

type CategoryIcons = keyof typeof categoryIcons

const paymentMethods = {
	money: 'Dinheiro',
	PIX: 'Pix',
	credit_card: 'Cartão de credito',
	debit_card: 'Cartão de debito',
	bank_check: 'Cheque Bancário',
	bank_transfer: 'Transferência Bancária',
}

type Method = keyof typeof paymentMethods

export function TransactionList() {
	const { data: transactions, isLoading } = useQuery({
		queryKey: ['users', 'transactions'],
		queryFn: async () => await fetchUsersTransactions({ query: undefined }),
	})

	return (
		<Table>
			<TableHeader className="font-bold">
				<TableRow>
					<TableHead scope="col" className="py-3 text-left">
						Nome
					</TableHead>
					<TableHead scope="col" className="px-7 py-3 text-center">
						Estabelecimento
					</TableHead>
					<TableHead scope="col" className="px-7 py-3 text-center">
						Data
					</TableHead>
					<TableHead scope="col" className="px-7 py-3 text-center">
						Método de Pagamento
					</TableHead>
					<TableHead scope="col" className="py-3 text-center">
						Valor
					</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{isLoading ? (
					<TableRow>
						<TableCell>
							<p>Carregando</p>
						</TableCell>
					</TableRow>
				) : (
					transactions?.map((transaction: TransactionProps) => (
						<TableRow key={transaction.id}>
							<TableCell className="flex items-center text-left">
								{categoryIcons[transaction.category as CategoryIcons]}
								<span className="font-semibold">{transaction.name}</span>
							</TableCell>

							<TableCell>{transaction.shopName}</TableCell>

							<TableCell>
								{format(new Date(transaction.created_at), 'dd/MM/yyyy')}
							</TableCell>

							<TableCell>
								{paymentMethods[transaction.payment_method as Method]}
							</TableCell>

							<TableCell className="font-semibold">
								{new Intl.NumberFormat('pt-BR', {
									style: 'currency',
									currency: 'BRL',
								}).format(transaction.amount)}
							</TableCell>
						</TableRow>
					))
				)}
			</TableBody>
		</Table>
	)
}
