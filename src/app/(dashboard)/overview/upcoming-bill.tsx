import { format } from 'date-fns'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const bills = [
	{
		lastCharge: new Date('06-14-2022'),
		dueDate: new Date('06-14-2022'),
		title: 'Figma',
		description: 'Design software',
		amount: 150,
		image_url: '',
	},
	{
		lastCharge: new Date('06-17-2022'),
		dueDate: new Date('06-17-2022'),
		title: 'Adobe',
		description: 'Design software',
		amount: 559,
		image_url: '',
	},
]

export function UpcomingBill() {
	return (
		<Card className="relative overflow-hidden">
			<CardHeader className="flex">
				<CardTitle className="text-xl">Contas à Vencer</CardTitle>

				<div className="flex items-center text-gray-500">
					<Link className="text-xs" href="/bills">
						View all
					</Link>
					<ChevronRight size={16} />
				</div>
			</CardHeader>
			<CardContent className="flex flex-col gap-3 divide-y divide-border ">
				{bills.map((bill, index) => (
					<div key={index} className="flex flex-1 items-center justify-between">
						<div className="flex items-center">
							<div className="mr-3 flex flex-col rounded bg-[#D2D2D2]/25 p-2">
								<span className="text-xs text-muted-foreground">
									{format(bill.dueDate, 'MMM')}
								</span>
								<p className="text-[22px] font-bold">
									{format(bill.dueDate, 'dd')}
								</p>
							</div>
							<div className="mr-5 flex flex-col">
								<span className="text-muted-foreground">
									{/* <Image src={bill.image_url} alt="" height={16} width={50} /> */}
								</span>
								<p>Figma - Monthly</p>
								<span className="text-xs text-gray-300">
									Last Charge - {format(bill.lastCharge, 'dd MMM, yyyy')}
								</span>
							</div>
						</div>
						<p className="rounded-lg border border-gray-100 px-3 py-2">
							{new Intl.NumberFormat('pt-BR', {
								style: 'currency',
								currency: 'BRL',
							}).format(bill.amount)}
						</p>
					</div>
				))}
			</CardContent>
			<div className="absolute inset-0 flex items-center justify-center bg-card">
				<span className="text-muted-foreground">Em desenvolvimento</span>
			</div>
		</Card>
	)
}
