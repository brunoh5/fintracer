'use client'

import { useQuery } from '@tanstack/react-query'
import {
	ArrowDown,
	ArrowRight,
	ArrowUp,
	Car,
	Clapperboard,
	Home,
	LayoutDashboard,
	ShoppingBag,
	Utensils,
} from 'lucide-react'
import { getSession } from 'next-auth/react'

import { fetchCategoriesExpenses } from '@/app/api/fetch-categories-expenses'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { api } from '@/services/api'
import { CategoryProps } from '@/types'

const categoryIcons = {
	Alimentação: <Utensils />,
	Transporte: <Car />,
	Entretenimento: <Clapperboard />,
	Shopping: <ShoppingBag />,
	Outros: <LayoutDashboard />,
	Casa: <Home />,
}

type CategoryIcons = keyof typeof categoryIcons

const statusIcons = {
	maior: <ArrowUp className="text-primary" size={16} />,
	menor: <ArrowDown className="text-chili-red" size={16} />,
}

type StatusIcons = keyof typeof statusIcons

export function ExpenseBreakdown() {
	const { data: categories } = useQuery({
		queryKey: ['categories', 'expenses'],
		queryFn: async () => {
			const session = await getSession()

			return fetchCategoriesExpenses({ session })
		},
		staleTime: 1000 * 60 * 10, // 10 minutes
	})

	return (
		<Card>
			<CardHeader>
				<div className="flex items-center justify-between">
					<h2 className="mb-2 text-[22px]">Gastos do mês</h2>
					{/* <span className="self-end font-medium text-gray-300">
						*Compare to last month
					</span> */}
				</div>
			</CardHeader>
			<CardContent>
				<div className="flex w-full flex-col gap-x-10 gap-y-6 rounded-lg lg:grid lg:grid-cols-3">
					{categories?.map((category) => (
						<div
							key={category.id}
							className="grid grid-cols-[3rem_1fr_1.5rem] items-center px-4 py-2"
						>
							<div className="flex h-14 w-12 items-center rounded-lg p-2">
								{categoryIcons[category.name as CategoryIcons]}
							</div>
							<div className="flex items-center gap-4">
								<div className="flex flex-col">
									<span className="text-xs text-gray-500">{category.name}</span>
									<p className="font-semibold">
										{/* {Number(category.transactions[0].total).toLocaleString(
											'pt-BR',
											{
												style: 'currency',
												currency: 'BRL',
											},
										)} */}
									</p>
									{/* <div className="flex items-center gap-2">
										<span className="text-xs text-gray-300">15%</span>
										{statusIcons['maior' as StatusIcons]}
									</div> */}
								</div>
								{/* <div className="flex flex-col items-end">
									<ArrowRight />
								</div> */}
							</div>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	)
}
