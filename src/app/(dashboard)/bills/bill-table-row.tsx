import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Search } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { TableCell, TableRow } from '@/components/ui/table'

interface BillTableRowProps {
	bill: {
		id: string
		dueDate: string
		logoUrl: string
		title: string
		description: string
		lastCharge: string
		amountInCents: number
		userId: string
		paid_at: string
	}
}

export function BillTableRow({ bill }: BillTableRowProps) {
	const [isDetailsOpen, setIsDetailsOpen] = useState(false)

	return (
		<TableRow>
			<TableCell>
				<Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
					<DialogTrigger asChild>
						<Button variant="outline" size="xs">
							<Search className="size-5" />
							<span className="sr-only">Detalhes da despesa</span>
						</Button>
					</DialogTrigger>

					{/* <TransactionDetails
						transactionId={transaction.id}
						open={isDetailsOpen}
					/> */}
				</Dialog>
			</TableCell>
			<TableCell>
				<div className="flex flex-col items-center rounded-lg bg-muted-foreground/10 p-2 text-center text-foreground">
					<span className="capitalize">
						{format(bill.dueDate, 'MMM', {
							locale: ptBR,
						})}
					</span>
					<span className="text-xl font-extrabold">
						{format(bill.dueDate, 'dd')}
					</span>
				</div>
			</TableCell>
			<TableCell className="space-y-1">
				<span className="font-extrabold">{bill.title}</span>
				<p className="text-justify text-sm text-muted-foreground">
					{bill.description}
				</p>
			</TableCell>
			<TableCell>
				{!bill.paid_at && (
					<div className="flex items-center gap-2">
						<div className="size-2 rounded-full bg-rose-500" />
						<span>Não pago</span>
					</div>
				)}

				{bill.paid_at && (
					<div className="flex items-center gap-2">
						<div className="size-2 rounded-full bg-emerald-500" />
						<span>Pago</span>
					</div>
				)}
			</TableCell>
			<TableCell className="text-center font-extrabold text-muted-foreground">
				{(bill.amountInCents / 100).toLocaleString('pt-BR', {
					style: 'currency',
					currency: 'BRL',
				})}
			</TableCell>
		</TableRow>
	)
}
