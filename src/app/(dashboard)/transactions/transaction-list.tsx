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
import { getSession } from 'next-auth/react'

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { apiBackend } from '@/lib/axios-backend'
import { TransactionProps } from '@/types'

const categoryIcon = {
	Casa: <Home size={24} className="mr-4" />,
	Alimentação: <Utensils size={24} className="mr-4" />,
	Transporte: <Car size={24} className="mr-4" />,
	Entretenimento: <Clapperboard size={24} className="mr-4" />,
	Shopping: <ShoppingBag size={24} className="mr-4" />,
	Outros: <LayoutDashboard size={24} className="mr-4" />,
}

type Icon = keyof typeof categoryIcon

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
	const { data: transactions, isLoading } = useQuery<TransactionProps[]>({
		queryKey: ['users', 'transactions'],
		queryFn: async () => {
			const session = await getSession()

			const response = await apiBackend.get('/users/transactions', {
				headers: { Authorization: `Bearer ${session?.access_token}` },
			})

			return response.data.transactions
		},
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
								{categoryIcon[transaction.category.name as Icon]}
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
