import { ChevronRight } from 'lucide-react'
import Link from 'next/link'

import { TabsTrigger } from '@/components/tabs-trigger'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList } from '@/components/ui/tabs'

import { Expenses } from './expense-list'
import { RevenueList } from './revenue-list'
import { TransactionsList } from './transaction-list'

export function RecentTransaction() {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Transações Recentes</CardTitle>
				<div className="flex items-center text-gray-500">
					<Link className="text-xs" href="/transactions">
						Ver todas
					</Link>
					<ChevronRight size={16} />
				</div>
			</CardHeader>
			<CardContent>
				<Tabs defaultValue="all">
					<TabsList className="grid w-full grid-cols-3 bg-transparent">
						<TabsTrigger value="all">Todas</TabsTrigger>
						<TabsTrigger value="revenues">Receita</TabsTrigger>
						<TabsTrigger value="expenses">Despesa</TabsTrigger>
					</TabsList>
					<TabsContent value="all">
						<TransactionsList />
					</TabsContent>
					<TabsContent value="revenues">
						<RevenueList />
					</TabsContent>
					<TabsContent value="expenses">
						<Expenses />
					</TabsContent>
				</Tabs>
			</CardContent>
		</Card>
	)
}
