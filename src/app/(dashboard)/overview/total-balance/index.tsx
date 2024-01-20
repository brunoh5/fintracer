import Link from 'next/link'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

import { AccountList } from './account-list'
import { Balance } from './balance'

export async function TotalBalance() {
	return (
		<Card>
			<CardHeader className="flex">
				<CardTitle className="text-xl">Balanço Geral</CardTitle>
			</CardHeader>
			<CardContent className="flex flex-col gap-3">
				<div className="flex items-center justify-between">
					<Balance />
					<Link href="/balances" className="text-xs text-muted-foreground">
						Todas as contas
					</Link>
				</div>

				<Separator />

				<AccountList />
			</CardContent>
		</Card>
	)
}
