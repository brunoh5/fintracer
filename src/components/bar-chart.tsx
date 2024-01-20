'use client'

import {
	Bar,
	BarChart as Chart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts'

export function BarChart() {
	const monthlyMetrics = [
		{ name: 'Jan', total: 400 },
		{ name: 'Fev', total: 500 },
		{ name: 'Mar', total: 600 },
		{ name: 'Abr', total: 400 },
		{ name: 'Mai' },
		{ name: 'Jun' },
		{ name: 'Jul' },
		{ name: 'Ago' },
		{ name: 'Set' },
		{ name: 'Out' },
		{ name: 'Nov' },
		{ name: 'Dez' },
	]

	return (
		<ResponsiveContainer width="100%" height="100%">
			<Chart data={monthlyMetrics}>
				<XAxis dataKey="name" />
				<YAxis />
				<Tooltip />
				<Bar dataKey="total" fill="#16a34a" />
			</Chart>
		</ResponsiveContainer>
	)
}
