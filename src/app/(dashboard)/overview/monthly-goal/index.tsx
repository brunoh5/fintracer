import dayJs from 'dayjs'
import { Goal, Medal } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

import { MonthlyGoalForm } from './form'

export function MonthlyGoal() {
	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-xl">Goals</CardTitle>
			</CardHeader>
			<CardContent className="flex flex-col gap-3">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2">
						<span className="text-[22px] font-bold text-muted-foreground">
							$20,000
						</span>

						<MonthlyGoalForm />
					</div>
					<p className="text-xs text-gray-900">{dayJs().format('MMM, YYYY')}</p>
				</div>

				<Separator />

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
						<div className="h-[94px] w-[144px] bg-primary" />
						<span className="text-xs">Target vs Achievement</span>
					</div>
				</div>
			</CardContent>
		</Card>
	)
}
