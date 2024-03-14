'use client'

import { useQuery } from '@tanstack/react-query'

import { getAccount } from '@/app/api/get-account'
import { Button } from '@/components/ui/button'
import { CardContent, CardFooter } from '@/components/ui/card'
import { AccountTypes } from '@/types'

import { BalanceAccountSkeleton } from './balance-account-skeleton'

export function ManageAccount({ accountId }: { accountId: string }) {
	const { data: account, isLoading } = useQuery({
		queryKey: ['accounts', accountId],
		queryFn: async () => await getAccount({ id: accountId }),
	})

	return (
		<>
			{isLoading ? (
				<BalanceAccountSkeleton />
			) : (
				<CardContent className="grid grid-cols-3 gap-x-28 gap-y-10">
					<div>
						<p className="text-muted-foreground">Nome do Banco</p>
						<p className="text-lg font-bold">{account?.bank}</p>
					</div>
					<div>
						<p className="text-muted-foreground">Tipo da conta</p>
						<p className="text-lg font-bold">
							{AccountTypes[account?.type as keyof typeof AccountTypes]}
						</p>
					</div>
					<div>
						<p className="text-muted-foreground">Saldo Atual</p>
						<p className="text-lg font-bold">
							{account &&
								new Intl.NumberFormat('pt-BR', {
									style: 'currency',
									currency: 'BRL',
								}).format(account.balance)}
						</p>
					</div>
					<div>
						{account?.number && (
							<>
								<p className="text-muted-foreground">Numero da conta</p>
								<p className="text-lg font-bold">{account?.number}</p>
							</>
						)}
					</div>
				</CardContent>
			)}
			<CardFooter className="flex items-center gap-4">
				<Button size="lg" disabled>
					Editar Conta
				</Button>
				<Button size="lg" variant="ghost" disabled>
					Remove
				</Button>
			</CardFooter>
		</>
	)
}
