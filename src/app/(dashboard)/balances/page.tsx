'use client'

import { Button } from '@/components/ui/button'
import { useNewAccount } from '@/features/accounts/hooks/use-new-account'

import { AccountList } from './accounts-list'

export default function Balances() {
	const { onOpen } = useNewAccount()

	return (
		<main className="relative flex flex-col gap-4 pb-8 pr-8 pt-4">
			<div className="flex items-center justify-between">
				<h2 className="text-[22px] text-muted-foreground">Contas</h2>
				<Button onClick={onOpen}>Criar conta</Button>
			</div>

			<AccountList />
		</main>
	)
}
