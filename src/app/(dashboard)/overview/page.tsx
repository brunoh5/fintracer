import { Header } from '@/components/header'
import { UpcomingBill } from '@/components/upcoming-bill'
import { Suspense } from 'react'
import { ExpenseBreakdown } from './expense-breakdown'
import { MonthlyGoal } from './monthly-goal'
import { Statistics } from './statistics'
import { TotalBalance } from './total-balance'
import { RecentTransaction } from './recent-transactions'

export default function Dashboard() {
	return (
		<div className="flex-1 w-screen flex-col ml-[280px]">
			<Header hasName />
			<main className="overflow-auto relative flex flex-col gap-8  pb-8 pl-6 pr-8 pt-4">
				<div className="flex items-center justify-between gap-6">
					{/* Top Content */}
					<TotalBalance />
					<Suspense>
						<MonthlyGoal />
					</Suspense>
					<Suspense>
						<UpcomingBill />
					</Suspense>
				</div>

				<div className="flex justify-between gap-6">
					{/* Bottom Content */}
					<RecentTransaction />

					<div className="flex flex-1 flex-col gap-8">
						<Suspense>
							<Statistics />
						</Suspense>
						<Suspense>
							<ExpenseBreakdown />
						</Suspense>
					</div>
				</div>
			</main>
		</div>
	)
}
