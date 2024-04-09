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
							<Search className="size-3" />
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
				<div className="flex flex-col items-center rounded-lg bg-muted-foreground/10 px-2 py-3 text-center text-foreground">
					<span>{format(bill.dueDate, 'MMM')}</span>
					<span className="text-xl font-extrabold">
						{format(bill.dueDate, 'dd', {
							locale: ptBR,
						})}
					</span>
				</div>
			</TableCell>
			<TableCell
				scope="row"
				className="flex-start flex w-[304px] flex-col py-8 text-left"
			>
				<span className="font-extrabold">{bill.title}</span>
				<p className="text-justify text-sm text-gray-300">{bill.description}</p>
			</TableCell>
			<TableCell className="px-7 py-8 text-gray-700">
				{bill.lastCharge && format(bill.lastCharge, 'dd MMM, yyyy')}
			</TableCell>
			<TableCell className="py-8 font-extrabold text-muted-foreground">
				{(bill.amountInCents / 100).toLocaleString('pt-BR', {
					style: 'currency',
					currency: 'BRL',
				})}
			</TableCell>
		</TableRow>
	)
}
