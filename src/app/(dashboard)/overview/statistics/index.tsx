import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'

import { MonthlyExpensesByYear } from './monthly-expenses-by-year'

export function Statistics() {
	return (
		<Card className="relative">
			<CardHeader>
				<CardTitle>Gastos Mensais</CardTitle>
				<CardDescription className="text-xs text-muted-foreground">
					Em um período de 12 meses
				</CardDescription>
			</CardHeader>
			<CardContent>
				<MonthlyExpensesByYear />
			</CardContent>
			{/* <div className="absolute inset-0 flex items-center justify-center bg-card">
				<span className="text-muted-foreground">Em desenvolvimento</span>
			</div> */}
		</Card>
	)
}
