import { format } from 'date-fns'

import { TableCell, TableRow } from '@/components/ui/table'

interface BillTableRowProps {
	bill: {
		id: string
		dueDate: string
		logoUrl: string
		title: string
		description: string
		lastCharge: string
		amount: number
		userId: string
	}
}

export function BillTableRow({ bill }: BillTableRowProps) {
	return (
		<TableRow>
			<TableCell>
				<div className="flex max-w-[72px] flex-col items-center rounded-lg bg-[#D2D2D2]/25 px-2 py-3 text-center text-gray-700">
					<span>{format(bill.dueDate, 'MMM')}</span>
					<span className="text-[22px] font-extrabold">
						{format(bill.dueDate, 'dd')}
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
				{new Intl.NumberFormat('pt-BR', {
					style: 'currency',
					currency: 'BRL',
				}).format(bill.amount)}
			</TableCell>
		</TableRow>
	)
}
