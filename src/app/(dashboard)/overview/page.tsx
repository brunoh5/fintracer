'use client'

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { useFetchAccounts } from '@/features/accounts/api/use-fetch-accounts'

import { formatCurrency } from '@/utils/price-formatter'
import { Table, TableBody, TableCell, TableRow } from '@components/ui/table'

// import { ExpenseBreakdown } from './expense-breakdown'
// import { MonthlyExpensesByYearChart } from './monthly-expenses-chart-by-year'

export default function Dashboard() {
	const { data } = useFetchAccounts()

	return (
		<main className="relative flex flex-col gap-y-8 pb-8 pr-8 pt-4">
			<Card>
				<CardHeader className="flex">
					<CardTitle>Saldo de caixa</CardTitle>
				</CardHeader>
				<CardContent>
					{data ? (
						<Table>
							<TableBody>
								{
									data.accounts.map(account => (
										<TableRow key={account.id}>
											<TableCell>{account.bank}</TableCell>
											<TableCell>{formatCurrency(account.balance)}</TableCell>
										</TableRow>
									))
								}
							</TableBody>
						</Table>
					) : (
						<div className="bg-primary">
							<span className="text-xs">Nenhuma conta cadastrada</span>
						</div>
					)}
				</CardContent>
				<CardFooter className='justify-between'>
					<div className="flex items-center justify-between">
						{data ? (
							<span className="text-xl font-bold">
								{formatCurrency(data.totalBalanceInCents)}
							</span>
						) : (
							<Skeleton className="h-5 w-[148px]" />
						)}
					</div>
				</CardFooter>
			</Card>

			{/* <div className="flex flex-col gap-2 lg:grid lg:gap-8">
				<MonthlyExpensesByYearChart />
				<ExpenseBreakdown />
			</div> */}
		</main>
	)
}
