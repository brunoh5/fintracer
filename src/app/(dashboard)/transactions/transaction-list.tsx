'use client'

import { TableBody, TableCell, TableRow } from '@/components/ui/table'
import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import {
	Car,
	Clapperboard,
	Home,
	LayoutDashboard,
	ShoppingBag,
	Utensils,
} from 'lucide-react'
import { getSession } from 'next-auth/react'

import { TransactionProps } from '@/types'
import { api } from '@/services/api'

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

			const response = await api.get('/users/transactions', {
				headers: { Authorization: `Bearer ${session?.user}` },
			})

			return response.data.transactions
		},
	})

	return (
		<TableBody>
			{isLoading ? (
				<p>Carregando</p>
			) : (
				transactions?.map((transaction: TransactionProps) => (
					<TableRow key={transaction.id}>
						<TableCell className="flex items-center text-left">
							{categoryIcon[transaction.category.name as Icon]}
							<span className="font-semibold">{transaction.name}</span>
						</TableCell>

						<TableCell>{transaction.shopName}</TableCell>

						<TableCell>
							{dayjs(transaction.created_at).format('MMM DD YYYY')}
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
	)
}
