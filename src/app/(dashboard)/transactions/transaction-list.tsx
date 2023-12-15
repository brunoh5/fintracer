'use client'

import { TableBody, TableCell, TableRow } from '@/components/ui/table'
import { api } from '@/services/api'
import { TransactionProps } from '@/types'
import { useSuspenseQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import Cookie from 'js-cookie'
import {
	Car,
	Clapperboard,
	Home,
	LayoutDashboard,
	ShoppingBag,
	Utensils,
} from 'lucide-react'

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
	const token = Cookie.get('token')

	const { data: transactions } = useSuspenseQuery<TransactionProps[]>({
		queryKey: ['users', 'transactions'],
		queryFn: async () => {
			const response = await api.get('/users/transactions', {
				headers: { Authorization: `Bearer ${token}` },
			})

			return response.data.transactions
		},
	})

	return (
		<TableBody>
			{transactions.map((transaction: TransactionProps, index) => (
				<TableRow key={index}>
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
			))}
		</TableBody>
	)
}
