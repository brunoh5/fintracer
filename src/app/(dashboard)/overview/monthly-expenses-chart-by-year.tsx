'use client'

import { useQuery } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import {
	Bar,
	BarChart,
	CartesianGrid,
	ResponsiveContainer,
	XAxis,
	YAxis,
} from 'recharts'

import { getMonthlyExpensesByYear } from '@/api/get-monthly-expenses-by-year'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'

export function MonthlyExpensesByYearChart() {
	const { data: monthlyExpenses } = useQuery({
		queryKey: ['monthly-expenses-by-year'],
		queryFn: getMonthlyExpensesByYear,
	})

	return (
		<Card className="relative">
			<CardHeader>
				<CardTitle>Gastos Mensais</CardTitle>
				<CardDescription className="text-xs text-muted-foreground">
					Em um período de 12 meses
				</CardDescription>
			</CardHeader>
			<CardContent>
				{monthlyExpenses ? (
					<ResponsiveContainer width="100%" height={240}>
						<BarChart data={monthlyExpenses} style={{ fontSize: 12 }}>
							<XAxis
								dataKey="month"
								tickLine={false}
								axisLine={false}
								dy={16}
							/>
							<YAxis
								stroke="#888"
								axisLine={false}
								tickLine={false}
								width={80}
								tickFormatter={(value: number) =>
									value.toLocaleString('pt-BR', {
										style: 'currency',
										currency: 'BRL',
									})
								}
							/>

							<CartesianGrid vertical={false} className="stroke-muted" />

							<Bar dataKey="total" fill="#16a34a" strokeWidth={2} />
						</BarChart>
					</ResponsiveContainer>
				) : (
					<div className="flex h-[210px] w-full items-center justify-center">
						<Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
					</div>
				)}
			</CardContent>
		</Card>
	)
}
