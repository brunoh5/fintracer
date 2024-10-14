import { formatCurrency } from '@/utils/price-formatter'

import { Skeleton } from '../ui/skeleton'

interface TransactionsStatusProps {
	totalRevenueInCents?: number
	totalExpenseInCents?: number
	isEmpty: boolean
	isLoading: boolean
}

export function TransactionsStatus({
	totalRevenueInCents,
	totalExpenseInCents,
	isEmpty,
	isLoading,
}: TransactionsStatusProps) {
	return (
		<div className="space-y-1 lg:flex lg:items-center lg:gap-2">
			<div className="flex items-center gap-2">
				<div className="size-2 rounded-full bg-emerald-500" />
				<span>Receitas:</span>
				{isLoading ? (
					<Skeleton className="h-3 w-16" />
				) : (
					<p>
						{isEmpty ? <p>R$ 0,00</p> : formatCurrency(totalRevenueInCents)}
					</p>
				)}
			</div>

			<div className="flex items-center gap-2">
				<div className="size-2 rounded-full bg-rose-500" />
				<span>Despesas:</span>
				{isLoading ? (
					<Skeleton className="h-3 w-16" />
				) : (
					<p>
						{isEmpty ? <p>R$ 0,00</p> : formatCurrency(totalExpenseInCents)}
					</p>
				)}
			</div>
		</div>
	)
}
