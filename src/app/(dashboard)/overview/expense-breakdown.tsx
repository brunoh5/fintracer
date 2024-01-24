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
	const { data: categories } = useQuery<CategoryProps[]>({
		queryKey: ['categories'],
		queryFn: async () => {
			const session = await getSession()

			const response = await api.get('/categories', {
				headers: {
					Authorization: `Bearer ${session?.user}`,
				},
			})

			return response.data.categories
		},
	})

	return (
		<Card>
			<CardHeader>
				<div className="flex items-center justify-between">
					<h2 className="mb-2 text-[22px] text-gray-500">Expenses Breakdown</h2>
					<span className="self-end font-medium text-gray-300">
						*Compare to last month
					</span>
				</div>
			</CardHeader>
			<CardContent>
				<div className="grid w-full gap-x-10 gap-y-6 rounded-lg bg-white px-6 py-5 sm:grid-cols-3">
					{categories?.map((category) => (
						<div
							key={category.id}
							className="flex items-center justify-between px-4 py-2"
						>
							<div className="flex h-14 w-10 items-center rounded-lg bg-[#D2D2D2]/25 p-2">
								{categoryIcons[category.name as CategoryIcons]}
							</div>
							<div className="flex items-center gap-4">
								<div className="flex flex-col">
									<span className="text-xs text-gray-500">{category.name}</span>
									<p className="font-semibold">$500</p>
									<div className="flex items-center gap-2">
										<span className="text-xs text-gray-300">15%</span>
										{statusIcons['maior' as StatusIcons]}
									</div>
								</div>
								<div className="flex flex-col items-end">
									<ArrowRight />
								</div>
							</div>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	)
}
