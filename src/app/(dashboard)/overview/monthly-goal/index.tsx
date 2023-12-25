import dayJs from 'dayjs'
import { Goal, Medal } from 'lucide-react'

import { MonthlyGoalForm } from './monthly-goal-form'

export function MonthlyGoal() {
	return (
		<div className="w-full">
			<h2 className="mb-2 text-[22px] text-gray-500">Goals</h2>
			<div className="flex h-[232px] flex-col gap-5 rounded-lg bg-white px-6 py-5">
				<div className="flex items-center justify-between border-b border-[#F3F3F3] pb-3">
					<div className="flex items-center gap-2">
						<span className="text-[22px] font-bold text-eerie-black-900">
							$20,000
						</span>

						<MonthlyGoalForm />
					</div>
					<p className="text-xs text-gray-900">{dayJs().format('MMM, YYYY')}</p>
				</div>

				<div className="flex items-center justify-between">
					<div className="flex flex-col gap-6">
						<div className="flex flex-col">
							<div className="flex items-center gap-1">
								<Medal size={16} className="text-gray-900" />
								<span className="text-xs text-gray-500">Target Achieved</span>
							</div>
							<span className="self-center font-bold">$12,500</span>
						</div>
						<div className="flex flex-col">
							<div className="flex items-center gap-1">
								<Goal size={16} className="text-gray-900" />
								<span className="text-xs text-gray-500">This month Target</span>
							</div>
							<span className="self-center font-bold">$20,000</span>
						</div>
					</div>
					<div>
						<div className="h-[94px] w-[144px] bg-persian-green" />
						<span className="text-xs">Target vs Achievement</span>
					</div>
				</div>
			</div>
		</div>
	)
}
