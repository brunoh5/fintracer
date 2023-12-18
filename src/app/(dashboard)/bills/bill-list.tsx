'use client'

import dayjs from 'dayjs'
import { useQuery } from '@tanstack/react-query'
import { getSession } from 'next-auth/react'

import { TableBody, TableCell, TableRow } from '@/components/ui/table'
import { BillsProps } from '@/types'
import { api } from '@/services/api'

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
						className="max-w-[72px] text-gray-700 flex flex-col items-center rounded-lg bg-[#D2D2D2]/25 px-2 py-3 text-center"
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
					<TableCell className="py-8 font-extrabold text-eerie-black-900">
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
