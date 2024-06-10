'use client'

import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useFetchBills } from '@/features/bills/api/use-fetch-bills'

export function UpcomingBill() {
	const { data } = useFetchBills()

	return (
		<Card className="col-span-2">
			<CardHeader className="flex">
				<CardTitle>Próximas contas</CardTitle>

				<div className="flex items-center text-muted-foreground">
					<Link className="text-xs" href="/bills">
						View all
					</Link>
					<ChevronRight size={16} />
				</div>
			</CardHeader>
			<CardContent className="flex flex-col gap-y-3 lg:grid lg:grid-cols-2 lg:gap-x-2">
				{data?.bills &&
					data.bills.map(
						(bill, index) =>
							index < 4 && (
								<div key={bill.id} className="flex items-center">
									<div className="mr-3 flex flex-col rounded bg-muted-foreground/10 p-2 text-center">
										<span className="text-xs capitalize text-muted-foreground">
											{format(bill.dueDate, 'MMM', {
												locale: ptBR,
											})}
										</span>
										<span className="text-[22px] font-bold">
											{format(bill.dueDate, 'dd', {
												locale: ptBR,
											})}
										</span>
									</div>
									<div className="space-y-1">
										<p>{bill.title}</p>
										<p className="font-bold">
											{(bill.amountInCents / 100).toLocaleString('pt-BR', {
												style: 'currency',
												currency: 'BRL',
											})}
										</p>
									</div>
								</div>
							),
					)}
			</CardContent>
		</Card>
	)
}
