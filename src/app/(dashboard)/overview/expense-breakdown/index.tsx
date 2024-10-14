'use client'

import { useQuery } from '@tanstack/react-query'

import { fetchExpenses } from '@/api/fetch-expenses'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'

import { Expense } from './expense'

import {
	Car,
	Clapperboard,
	Home,
	LayoutDashboard,
	ShoppingBag,
	Utensils,
} from 'lucide-react'
import type { ReactNode } from 'react'

import { formatCurrency } from '@/utils/price-formatter'
import { ExpenseDiff } from './expense-diff'

interface ExpenseProps {
	title:
		| 'Alimentação'
		| 'Transporte'
		| 'Entretenimento'
		| 'Compras'
		| 'Outros'
		| 'Moradia'
	expense:
		| {
				category: string
				diffBetweenMonth: number
				amount: number
		  }
		| undefined
}

const transactionCategoryIconMap: Record<string, ReactNode> = {
	FOOD: <Utensils />,
	Transporte: <Car />,
	Entretenimento: <Clapperboard />,
	SHOPPING: <ShoppingBag />,
	OTHERS: <LayoutDashboard />,
	Moradia: <Home />,
}

export function ExpenseBreakdown() {
	const { data } = useQuery({
		queryKey: ['metrics'],
		queryFn: fetchExpenses,
	})

	if (!data) {
		return null
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>Gastos do mês</CardTitle>
				<CardDescription className="text-xs text-muted-foreground">
					Comparado ao mês anterior
				</CardDescription>
			</CardHeader>
			<CardContent className="grid grid-cols-2 gap-x-10 gap-y-6 lg:grid-cols-3">
				{Object.entries(data).map(([category, { lastMonth, currentMonth }]) => {
					console.log(lastMonth, currentMonth)
					return (
						<div
							key={category}
							className="grid grid-cols-[3rem_1fr_1.5rem] items-center px-4 py-2"
						>
							<div className="flex h-14 w-12 items-center rounded-lg p-2">
								{transactionCategoryIconMap[category]}
							</div>
							<div className="flex items-center gap-4">
								<div className="flex flex-col">
									<span className="text-xs text-muted-foreground">
										{category}
									</span>
									<p className="font-semibold">
										{formatCurrency(currentMonth * -1)}
									</p>
									{/* <ExpenseDiff diffBetweenMonth={diffBetweenMonth} /> */}
								</div>
							</div>
						</div>
					)
				})}
			</CardContent>
		</Card>
	)
}
