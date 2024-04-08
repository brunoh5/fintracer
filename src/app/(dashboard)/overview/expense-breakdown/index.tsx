'use client'

import { useQuery } from '@tanstack/react-query'
import {
	ArrowDown,
	ArrowUp,
	Car,
	Clapperboard,
	Home,
	LayoutDashboard,
	Minus,
	ShoppingBag,
	Utensils,
} from 'lucide-react'

import { fetchExpenses } from '@/api/fetch-expenses'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'

export function ExpenseBreakdown() {
	const { data: expenses } = useQuery({
		queryKey: ['expenses'],
		queryFn: fetchExpenses,
	})

	return (
		<Card>
			<CardHeader>
				<CardTitle>Gastos do mês</CardTitle>
				<CardDescription className="text-xs text-muted-foreground">
					Comparado ao mês anterior
				</CardDescription>
			</CardHeader>
			<CardContent className="flex w-full flex-col gap-x-10 gap-y-6 rounded-lg lg:grid lg:grid-cols-3">
				<div className="grid grid-cols-[3rem_1fr_1.5rem] items-center px-4 py-2">
					<div className="flex h-14 w-12 items-center rounded-lg p-2">
						<Home />
					</div>
					<div className="flex items-center gap-4">
						<div className="flex flex-col">
							<span className="text-xs text-gray-500">Moradia</span>
							<p className="font-semibold">
								{expenses?.HOME
									? (expenses?.HOME.transactions[0].total * -1).toLocaleString(
											'pt-BR',
											{
												style: 'currency',
												currency: 'BRL',
											},
										)
									: 0}
							</p>
							<div className="flex items-center gap-2">
								<span className="text-xs text-muted-foreground">
									{expenses?.HOME ? expenses?.HOME.diffBetweenMonth : 0}%
								</span>
								{expenses?.HOME && expenses?.HOME.diffBetweenMonth > 0 && (
									<ArrowUp className="text-primary" size={16} />
								)}

								{expenses?.HOME && expenses?.HOME.diffBetweenMonth < 0 && (
									<ArrowDown className="text-primary" size={16} />
								)}

								{expenses?.HOME === undefined && (
									<Minus className="text-primary" size={16} />
								)}
							</div>
						</div>
					</div>
				</div>

				<div className="grid grid-cols-[3rem_1fr_1.5rem] items-center px-4 py-2">
					<div className="flex h-14 w-12 items-center rounded-lg p-2">
						<Utensils />
					</div>
					<div className="flex items-center gap-4">
						<div className="flex flex-col">
							<span className="text-xs text-gray-500">Alimentação</span>
							<p className="font-semibold">
								{expenses?.FOOD
									? (expenses?.FOOD.transactions[0].total * -1).toLocaleString(
											'pt-BR',
											{
												style: 'currency',
												currency: 'BRL',
											},
										)
									: 0}
							</p>
							<div className="flex items-center gap-2">
								<span className="text-xs text-muted-foreground">
									{expenses?.FOOD ? expenses?.FOOD.diffBetweenMonth : 0}%
								</span>
								{expenses?.FOOD && expenses?.FOOD.diffBetweenMonth > 0 && (
									<ArrowUp className="text-primary" size={16} />
								)}

								{expenses?.FOOD && expenses?.FOOD.diffBetweenMonth < 0 && (
									<ArrowDown className="text-primary" size={16} />
								)}

								{expenses?.FOOD === undefined && (
									<Minus className="text-primary" size={16} />
								)}
							</div>
						</div>
					</div>
				</div>

				<div className="grid grid-cols-[3rem_1fr_1.5rem] items-center px-4 py-2">
					<div className="flex h-14 w-12 items-center rounded-lg p-2">
						<Car />
					</div>
					<div className="flex items-center gap-4">
						<div className="flex flex-col">
							<span className="text-xs text-gray-500">Moradia</span>
							<p className="font-semibold">
								{expenses?.TRANSPORT
									? (
											expenses?.TRANSPORT.transactions[0].total * -1
										).toLocaleString('pt-BR', {
											style: 'currency',
											currency: 'BRL',
										})
									: 0}
							</p>
							<div className="flex items-center gap-2">
								<span className="text-xs text-muted-foreground">
									{expenses?.TRANSPORT
										? expenses?.TRANSPORT.diffBetweenMonth
										: 0}
									%
								</span>
								{expenses?.TRANSPORT &&
									expenses?.TRANSPORT.diffBetweenMonth > 0 && (
										<ArrowUp className="text-primary" size={16} />
									)}

								{expenses?.TRANSPORT &&
									expenses?.TRANSPORT.diffBetweenMonth < 0 && (
										<ArrowDown className="text-primary" size={16} />
									)}

								{expenses?.TRANSPORT === undefined && (
									<Minus className="text-primary" size={16} />
								)}
							</div>
						</div>
					</div>
				</div>

				<div className="grid grid-cols-[3rem_1fr_1.5rem] items-center px-4 py-2">
					<div className="flex h-14 w-12 items-center rounded-lg p-2">
						<Clapperboard />
					</div>
					<div className="flex items-center gap-4">
						<div className="flex flex-col">
							<span className="text-xs text-gray-500">Entretenimento</span>
							<p className="font-semibold">
								{expenses?.ENTERTAINMENT
									? (
											expenses?.ENTERTAINMENT.transactions[0].total * -1
										).toLocaleString('pt-BR', {
											style: 'currency',
											currency: 'BRL',
										})
									: 0}
							</p>
							<div className="flex items-center gap-2">
								<span className="text-xs text-muted-foreground">
									{expenses?.ENTERTAINMENT
										? expenses?.ENTERTAINMENT.diffBetweenMonth
										: 0}
									%
								</span>
								{expenses?.ENTERTAINMENT &&
									expenses?.ENTERTAINMENT.diffBetweenMonth > 0 && (
										<ArrowUp className="text-primary" size={16} />
									)}

								{expenses?.ENTERTAINMENT &&
									expenses?.ENTERTAINMENT.diffBetweenMonth < 0 && (
										<ArrowDown className="text-primary" size={16} />
									)}

								{expenses?.ENTERTAINMENT === undefined && (
									<Minus className="text-primary" size={16} />
								)}
							</div>
						</div>
					</div>
				</div>

				<div className="grid grid-cols-[3rem_1fr_1.5rem] items-center px-4 py-2">
					<div className="flex h-14 w-12 items-center rounded-lg p-2">
						<ShoppingBag />
					</div>
					<div className="flex items-center gap-4">
						<div className="flex flex-col">
							<span className="text-xs text-gray-500">Compras</span>
							<p className="font-semibold">
								{expenses?.SHOPPING
									? (
											expenses?.SHOPPING.transactions[0].total * -1
										).toLocaleString('pt-BR', {
											style: 'currency',
											currency: 'BRL',
										})
									: 0}
							</p>
							<div className="flex items-center gap-2">
								<span className="text-xs text-muted-foreground">
									{expenses?.SHOPPING ? expenses?.SHOPPING.diffBetweenMonth : 0}
									%
								</span>
								{expenses?.SHOPPING &&
									expenses?.SHOPPING.diffBetweenMonth > 0 && (
										<ArrowUp className="text-primary text-rose-500" size={16} />
									)}

								{expenses?.SHOPPING &&
									expenses?.SHOPPING.diffBetweenMonth < 0 && (
										<ArrowDown
											className="text-green-500 text-primary"
											size={16}
										/>
									)}

								{expenses?.SHOPPING === undefined && (
									<Minus className="text-primary" size={16} />
								)}
							</div>
						</div>
					</div>
				</div>

				<div className="grid grid-cols-[3rem_1fr_1.5rem] items-center px-4 py-2">
					<div className="flex h-14 w-12 items-center rounded-lg p-2">
						<LayoutDashboard />
					</div>
					<div className="flex items-center gap-4">
						<div className="flex flex-col">
							<span className="text-xs text-gray-500">Outros</span>
							<p className="font-semibold">
								{expenses?.OTHERS
									? (
											expenses?.OTHERS.transactions[0].total * -1
										).toLocaleString('pt-BR', {
											style: 'currency',
											currency: 'BRL',
										})
									: 0}
							</p>
							<div className="flex items-center gap-2">
								<span className="text-xs text-muted-foreground">
									{expenses?.OTHERS ? expenses?.OTHERS.diffBetweenMonth : 0}%
								</span>
								{expenses?.OTHERS && expenses?.OTHERS.diffBetweenMonth > 0 && (
									<ArrowUp className="text-primary" size={16} />
								)}

								{expenses?.OTHERS && expenses?.OTHERS.diffBetweenMonth < 0 && (
									<ArrowDown className="text-primary" size={16} />
								)}

								{expenses?.OTHERS === undefined && (
									<Minus className="text-primary" size={16} />
								)}
							</div>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	)
}
