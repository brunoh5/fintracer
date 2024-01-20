import { ChevronDown } from 'lucide-react'

import { BarChart } from '@/components/bar-chart'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function Statistics() {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Statistics</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-3 font-bold">
						<span>Weekly Comparison</span>
						<ChevronDown />
					</div>
					<div className="flex items-center gap-6">
						<div className="flex items-center gap-2">
							<span className="h-2 w-4 rounded-sm bg-primary" />
							<span className="text-xs font-medium text-gray-900">
								This Week
							</span>
						</div>
						<div className="flex items-center gap-2">
							<span className="h-2 w-4 rounded-sm bg-gray-100" />
							<span className="text-xs font-medium text-gray-900">
								Last Week
							</span>
						</div>
					</div>
				</div>

				{/* <div className="flex h-[184px]  bg-primary">
					<p>Bar Graph</p>
				</div> */}
				<BarChart />
			</CardContent>
		</Card>
	)
}
