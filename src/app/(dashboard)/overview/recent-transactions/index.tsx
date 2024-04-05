import { ChevronRight } from 'lucide-react'
import Link from 'next/link'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

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
			<CardContent className="px-4">
				<TransactionsList />
			</CardContent>
		</Card>
	)
}
