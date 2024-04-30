import { Metadata } from 'next'

import { ExpenseBreakdown } from './expense-breakdown'
import { MonthlyExpensesByYearChart } from './monthly-expenses-chart-by-year'
// import { MonthlyGoal } from './monthly-goal'
import { RecentTransaction } from './recent-transactions'
import { TotalBalance } from './total-balance'
import { UpcomingBill } from './upcoming-bill'

export const metadata: Metadata = {
	title: 'Dashboard',
}

export default async function Dashboard() {
	return (
		<>
			<main className="relative flex flex-col gap-y-8 pb-8 pl-6 pr-8 pt-4">
				<div className="grid grid-cols-1 gap-y-6 lg:grid-cols-3 lg:gap-y-0">
					<TotalBalance />
					{/* <MonthlyGoal /> */}
					<UpcomingBill />
				</div>

				<div className="grid grid-cols-1 grid-rows-[700px] gap-y-6 lg:grid-cols-3 lg:gap-6">
					<RecentTransaction />

					<div className="col-span-2 flex flex-col gap-2 lg:grid lg:gap-8">
						<MonthlyExpensesByYearChart />
						<ExpenseBreakdown />
					</div>
				</div>
			</main>
		</>
	)
}
