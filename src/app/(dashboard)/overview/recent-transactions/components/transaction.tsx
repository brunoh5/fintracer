import dayjs from 'dayjs'
import {
	Car,
	Clapperboard,
	Home,
	LayoutDashboard,
	ShoppingBag,
	Utensils,
} from 'lucide-react'
import { HTMLAttributes } from 'react'

import { TransactionProps } from '@/types'

const categoryIcons = {
	Alimentação: <Utensils />,
	Transporte: <Car />,
	Entretenimento: <Clapperboard />,
	Shopping: <ShoppingBag />,
	Outros: <LayoutDashboard />,
	Casa: <Home />,
}

type CategoryIcons = keyof typeof categoryIcons

interface TransactionsProps extends HTMLAttributes<HTMLDivElement> {
	transaction: TransactionProps
}

export function Transaction({ transaction, ...rest }: TransactionsProps) {
	return (
		<div className="flex items-center justify-between gap-7 py-6" {...rest}>
			<div className="flex items-center gap-4">
				<div className="p-2">
					{categoryIcons[transaction.category.name as CategoryIcons]}
				</div>
				<div className="flex flex-col">
					<p className="font-semibold">{transaction.name}</p>
					<span className="text-xs text-gray-300">{transaction.shopName}</span>
				</div>
			</div>
			<div className="flex flex-col items-end">
				<span className="font-semibold text-gray-900">
					{new Intl.NumberFormat('pt-BR', {
						style: 'currency',
						currency: 'BRL',
					}).format(transaction.amount)}
				</span>
				<span className="text-xs text-gray-300">
					{dayjs(transaction.created_at).format('MMM DD YYYY')}
				</span>
			</div>
		</div>
	)
}
