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

export function ExpenseBreakdown() {
	const { data: metrics } = useQuery({
		queryKey: ['metrics'],
		queryFn: fetchExpenses,
	})

	return (
		<Card>
			<CardHeader>
				<CardTitle>Gastos do mês</CardTitle>
				<CardDescription className="text-xs text-muted-foreground">
					Comparado ao mês anterior
				</CardDescription>
			</CardHeader>
			<CardContent className="grid grid-cols-2 gap-x-10 gap-y-6 lg:grid-cols-3">
				<Expense
					title="Moradia"
					expense={
						metrics && metrics.find((expense) => expense.category === 'HOME')
					}
				/>

				<Expense
					title="Alimentação"
					expense={
						metrics && metrics.find((expense) => expense.category === 'FOOD')
					}
				/>

				<Expense
					title="Transporte"
					expense={
						metrics &&
						metrics.find((expense) => expense.category === 'TRANSPORTATION')
					}
				/>

				<Expense
					title="Entretenimento"
					expense={
						metrics &&
						metrics.find((expense) => expense.category === 'ENTERTAINMENT')
					}
				/>

				<Expense
					title="Compras"
					expense={
						metrics &&
						metrics.find((expense) => expense.category === 'SHOPPING')
					}
				/>

				<Expense
					title="Outros"
					expense={
						metrics && metrics.find((expense) => expense.category === 'OTHERS')
					}
				/>
			</CardContent>
		</Card>
	)
}
