import type { Metadata } from 'next'

import { ExpenseBreakdown } from './expense-breakdown'
import { MonthlyExpensesByYearChart } from './monthly-expenses-chart-by-year'
import { TotalBalance } from './total-balance'

export const metadata: Metadata = {
	title: 'Dashboard',
}

export default async function Dashboard() {
	return (
		<main className="relative flex flex-col gap-y-8 pb-8 pr-8 pt-4">
			<TotalBalance />

			<div className="flex flex-col gap-2 lg:grid lg:gap-8">
				<MonthlyExpensesByYearChart />
				<ExpenseBreakdown />
			</div>
		</main>
	)
}
