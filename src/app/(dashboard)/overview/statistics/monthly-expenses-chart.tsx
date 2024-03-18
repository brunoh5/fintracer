'use client'

import { useQuery } from '@tanstack/react-query'
import {
	Bar,
	BarChart,
	CartesianGrid,
	ResponsiveContainer,
	XAxis,
	YAxis,
} from 'recharts'

import { getMonthlyExpensesByYear } from '@/app/api/get-monthly-expenses-by-year'

export function MonthlyExpensesChart() {
	const { data: monthlyExpenses } = useQuery({
		queryKey: ['monthly-expenses-by-year'],
		queryFn: getMonthlyExpensesByYear,
	})

	return (
		<ResponsiveContainer width="100%" height={210}>
			<BarChart data={monthlyExpenses}>
				<XAxis dataKey="month" tickLine={false} axisLine={false} dy={16} />
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
	)
}
