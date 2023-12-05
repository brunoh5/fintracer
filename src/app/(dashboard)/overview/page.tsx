'use client'

import { Header } from '@/components/ui/header'
import { UpcomingBill } from '@/components/upcoming-bill'
import { Suspense } from 'react'
import { ExpenseBreakdown } from './expense-breakdown'
import { MonthlyGoal } from './monthly-goal'
import { RecentTransaction } from './recent-transaction'
import { Statistics } from './statistics'
import { TotalBalance } from './total-balance'

// type Repos = {
// 	full_name: string
// 	description: string
// }

export default function Dashboard() {
	// const { data, isFetching } = useQuery<Repos[]>({
	// 	queryKey: ['repos'],
	// 	queryFn: async () => {
	// 		const response = await axios.get(
	// 			'https://api.github.com/users/brunoh5/repos',
	// 		)

	// 		return response.data
	// 	},
	// 	staleTime: 1000 * 60, // 1 minute
	// })

	return (
		<div className="flex w-screen flex-col">
			{/* {isFetching && <p>Carregando...</p>}
			{data?.map((repo) => {
				return (
					<li key={repo.full_name}>
						<strong>{repo.full_name}</strong>
						<p>{repo.description}</p>
					</li>
				)
			})} */}
			<Header hasName />
			<main className="relative flex flex-col gap-8  pb-8 pl-6 pr-8 pt-4">
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
					<Suspense>
						<RecentTransaction />
					</Suspense>

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
