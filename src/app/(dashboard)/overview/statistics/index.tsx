import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'

import { MonthlyExpensesChart } from './monthly-expenses-chart'

export function Statistics() {
	return (
		<Card className="relative">
			<CardHeader>
				<CardTitle>Gastos Mensais</CardTitle>
				<CardDescription className="text-xs text-muted-foreground">
					Em um período de 12 meses
				</CardDescription>
			</CardHeader>
			<CardContent className="px-3">
				<MonthlyExpensesChart />
			</CardContent>
		</Card>
	)
}
