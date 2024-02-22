'use client'

import { useQuery } from '@tanstack/react-query'
import {
	ArrowDown,
	ArrowRight,
	ArrowUp,
	Car,
	Clapperboard,
	Home,
	LayoutDashboard,
	ShoppingBag,
	Utensils,
} from 'lucide-react'
import { getSession } from 'next-auth/react'

import { fetchCategoriesExpenses } from '@/app/api/fetch-categories-expenses'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { calculatePercentageDifference } from '@/lib/calculate-percentage-difference'

const categoryIcons = {
	Alimentação: <Utensils />,
	Transporte: <Car />,
	Entretenimento: <Clapperboard />,
	Shopping: <ShoppingBag />,
	Outros: <LayoutDashboard />,
	Casa: <Home />,
}

type CategoryIcons = keyof typeof categoryIcons

export function ExpenseBreakdown() {
	const { data: categories } = useQuery({
		queryKey: ['categories', 'expenses'],
		queryFn: async () => {
			const session = await getSession()

			return fetchCategoriesExpenses({ session })
		},
		staleTime: 1000 * 60 * 10, // 10 minutes
	})

	return (
		<Card>
			<CardHeader>
				<div className="flex items-center justify-between">
					<h2 className="text-[22px]">Gastos do mês</h2>
					<span className="self-end font-medium text-muted-foreground">
						*Comparado ao mês anterior
					</span>
				</div>
			</CardHeader>
			<CardContent>
				<div className="flex w-full flex-col gap-x-10 gap-y-6 rounded-lg lg:grid lg:grid-cols-3">
					{categories?.map((category) => {
						let currentMonthExpense = 0
						let lastMonthExpense = 0

						if (category.transactions[0] !== null) {
							currentMonthExpense = category.transactions[0].total
							if (category.transactions[1] !== null) {
								lastMonthExpense = category.transactions[1].total
							}
						}

						const expenseCompareInPercentage = calculatePercentageDifference(
							lastMonthExpense,
							currentMonthExpense,
						)

						return (
							<div
								key={category.id}
								className="grid grid-cols-[3rem_1fr_1.5rem] items-center px-4 py-2"
							>
								<div className="flex h-14 w-12 items-center rounded-lg p-2">
									{categoryIcons[category.name as CategoryIcons]}
								</div>
								<div className="flex items-center gap-4">
									<div className="flex flex-col">
										<span className="text-xs text-gray-500">
											{category.name}
										</span>
										<p className="font-semibold">
											{category.transactions[0] !== null
												? currentMonthExpense.toLocaleString('pt-BR', {
														style: 'currency',
														currency: 'BRL',
													})
												: Number(0).toLocaleString('pt-BR', {
														style: 'currency',
														currency: 'BRL',
													})}
										</p>
										<div className="flex items-center gap-2">
											<span className="text-xs text-muted-foreground">
												{expenseCompareInPercentage}%
											</span>
											{expenseCompareInPercentage > 0 && (
												<ArrowUp className="text-primary" size={16} />
											)}

											{expenseCompareInPercentage < 0 && (
												<ArrowDown className="text-primary" size={16} />
											)}
										</div>
									</div>
									{/* <div className="flex flex-col items-end">
									<ArrowRight />
								</div> */}
								</div>
							</div>
						)
					})}
				</div>
			</CardContent>
		</Card>
	)
}
