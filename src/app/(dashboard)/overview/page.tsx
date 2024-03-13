import { Metadata } from 'next'

import { ExpenseBreakdown } from './expense-breakdown'
import { MonthlyGoal } from './monthly-goal'
import { RecentTransaction } from './recent-transactions'
import { Statistics } from './statistics'
import { TotalBalance } from './total-balance'
import { UpcomingBill } from './upcoming-bill'

export const metadata: Metadata = {
	title: 'Dashboard',
}

export default async function Dashboard() {
	return (
		<>
			<main className="relative flex flex-col gap-y-8 pb-8 pl-6 pr-8 pt-4">
				<div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
					<TotalBalance />
					<MonthlyGoal />
					<UpcomingBill />
				</div>

				<div className="grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-6">
					<RecentTransaction />

					<div className="col-span-2 flex flex-col gap-8">
						<Statistics />
						<ExpenseBreakdown />
					</div>
				</div>
			</main>
		</>
	)
}
