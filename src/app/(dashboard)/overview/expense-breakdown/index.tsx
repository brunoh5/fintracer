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
				{metrics && (
					<>
						<Expense
							title="Moradia"
							expense={
								metrics.find((item) => item.category === 'HOME') ?? undefined
							}
						/>
						<Expense
							title="Alimentação"
							expense={
								metrics.find((item) => item.category === 'FOOD') ?? undefined
							}
						/>

						<Expense
							title="Transporte"
							expense={
								metrics.find((item) => item.category === 'TRANSPORTATION') ??
								undefined
							}
						/>

						<Expense
							title="Entretenimento"
							expense={
								metrics.find((item) => item.category === 'ENTERTAINMENT') ??
								undefined
							}
						/>

						<Expense
							title="Compras"
							expense={
								metrics.find((item) => item.category === 'SHOPPING') ??
								undefined
							}
						/>

						<Expense
							title="Outros"
							expense={
								metrics.find((item) => item.category === 'OTHERS') ?? undefined
							}
						/>
					</>
				)}
			</CardContent>
		</Card>
	)
}
