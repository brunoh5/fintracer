import { format } from 'date-fns'

import { TransactionPaymentMethod } from '@/components/transaction-payment-method'

import { TransactionIcon } from './transaction-icon'

export interface TransactionProps {
	transaction: {
		id: string
		name: string
		category:
			| 'FOOD'
			| 'OTHERS'
			| 'HOME'
			| 'TRANSPORTATION'
			| 'ENTERTAINMENT'
			| 'SHOPPING'
		transaction_type: string
		payment_method: TransactionPaymentMethod
		created_at: string
		amount: number
		shopName: string
	}
}

export function Transaction({ transaction }: TransactionProps) {
	return (
		<div className="flex items-center justify-between gap-7 py-6">
			<div className="flex items-center gap-4">
				<TransactionIcon category={transaction.category} />
				<div className="flex flex-col">
					<p className="font-semibold">{transaction.name}</p>
					<span className="text-xs text-gray-300">{transaction.shopName}</span>
				</div>
			</div>
			<div className="flex flex-col items-end">
				{transaction.transaction_type === 'CREDIT' && (
					<span className="font-semibold text-emerald-500 text-foreground">
						+
						{new Intl.NumberFormat('pt-BR', {
							style: 'currency',
							currency: 'BRL',
						}).format(transaction.amount)}
					</span>
				)}
				{transaction.transaction_type === 'DEBIT' && (
					<span className="font-semibold text-foreground text-rose-400">
						-
						{new Intl.NumberFormat('pt-BR', {
							style: 'currency',
							currency: 'BRL',
						}).format(transaction.amount)}
					</span>
				)}
				<span className="text-xs text-gray-300">
					{format(new Date(transaction.created_at), 'dd MMM yyyy')}
				</span>
			</div>
		</div>
	)
}
