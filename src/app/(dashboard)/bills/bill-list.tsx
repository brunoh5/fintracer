'use client'

import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { getSession } from 'next-auth/react'

import { TableBody, TableCell, TableRow } from '@/components/ui/table'
import { api } from '@/services/api'
import { BillsProps } from '@/types'

export function BillList() {
	const { data: bills } = useQuery<BillsProps[]>({
		queryKey: ['bills'],
		queryFn: async () => {
			const session = await getSession()

			const response = await api.get('/bills', {
				headers: {
					Authorization: `Bearer ${session?.user}`,
				},
			})

			return response.data.bills
		},
	})

	return (
		<TableBody className="divide-y">
			{bills?.map((bill) => (
				<TableRow key={bill.id}>
					<TableCell
						scope="row"
						className="flex max-w-[72px] flex-col items-center rounded-lg bg-[#D2D2D2]/25 px-2 py-3 text-center text-gray-700"
					>
						<span>{dayjs(bill.dueDate).format('MMM')}</span>
						<span className="text-[22px] font-extrabold">
							{dayjs(bill.dueDate).format('DD')}
						</span>
					</TableCell>
					<TableCell
						scope="row"
						className="flex-start flex w-[304px] flex-col py-8 text-left"
					>
						<span className="font-extrabold">{bill.title}</span>
						<p className="text-justify text-sm text-gray-300">
							{bill.description}
						</p>
					</TableCell>
					<TableCell className="px-7 py-8 text-gray-700">
						{dayjs(bill.lastCharge).format('DD MMM, YYYY')}
					</TableCell>
					<TableCell className="py-8 font-extrabold text-muted-foreground">
						{new Intl.NumberFormat('pt-BR', {
							style: 'currency',
							currency: 'BRL',
						}).format(bill.amount)}
					</TableCell>
				</TableRow>
			))}
		</TableBody>
	)
}
