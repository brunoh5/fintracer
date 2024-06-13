import { formatCurrency } from '@/lib/price-formatter'

import { Skeleton } from '../ui/skeleton'

interface TransactionsStatusProps {
	totalRevenueInCents?: number
	totalExpenseInCents?: number
}

export function TransactionsStatus({
	totalRevenueInCents,
	totalExpenseInCents,
}: TransactionsStatusProps) {
	return (
		<div className="space-y-1 lg:flex lg:items-center lg:gap-2">
			<span className="col-span-2 text-sm font-semibold">Status</span>
			<div className="flex items-center gap-2">
				<div className="size-2 rounded-full bg-emerald-500" />
				<span>Receitas:</span>
				{!totalRevenueInCents && <Skeleton className="h-2 w-6" />}
				<p>{totalRevenueInCents && formatCurrency(totalRevenueInCents)}</p>
			</div>

			<div className="flex items-center gap-2">
				<div className="size-2 rounded-full bg-rose-500" />
				<span>Despesas:</span>
				{!totalExpenseInCents && <Skeleton className="h-2 w-6" />}
				<p>{totalExpenseInCents && formatCurrency(totalExpenseInCents)}</p>
			</div>
		</div>
	)
}
