'use client'

import { TabsTrigger } from '@/components/tabs-trigger'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList } from '@/components/ui/tabs'

import { TransactionList } from './transaction-list'

export default function Transactions() {
	return (
		<main className="flex flex-col gap-4 pb-8 pl-6 pr-8 pt-4">
			<h2 className="text-[22px] text-foreground">Transações Recentes</h2>

			<Tabs defaultValue="all">
				<TabsList className="flex w-[300px] items-center justify-between bg-transparent font-bold text-foreground">
					<TabsTrigger value="all">Todos</TabsTrigger>
					<TabsTrigger value="revenues">Receita</TabsTrigger>
					<TabsTrigger value="expenses">Despesa</TabsTrigger>
				</TabsList>

				<TabsContent value="all">
					<TransactionList />
				</TabsContent>

				<TabsContent value="revenues">
					<TransactionList />
				</TabsContent>

				<TabsContent value="expenses">
					<TransactionList />
				</TabsContent>
			</Tabs>

			<div className="mb-8 mt-8 flex items-center justify-center">
				<Button type="submit" className="w-48" disabled>
					Load More
				</Button>
			</div>
		</main>
	)
}
