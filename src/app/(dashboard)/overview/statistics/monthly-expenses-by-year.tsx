'use client'

import { useQuery } from '@tanstack/react-query'
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'

import { getMonthlyExpensesByYear } from '@/app/api/get-monthly-expenses-by-year'

export function MonthlyExpensesByYear() {
	const monthlyMetrics = [
		{ name: 'Jan', total: 400 },
		{ name: 'Fev', total: 500 },
		{ name: 'Mar', total: 600 },
		{ name: 'Abr', total: 400 },
	]

	const { data } = useQuery({
		queryKey: ['monthly-expenses'],
		queryFn: getMonthlyExpensesByYear,
	})

	console.log(data)

	return (
		<ResponsiveContainer width="100%" height={240}>
			<BarChart data={monthlyMetrics}>
				<XAxis dataKey="name" />
				<YAxis />
				<Bar dataKey="total" fill="#16a34a" />
			</BarChart>
		</ResponsiveContainer>
	)
}
