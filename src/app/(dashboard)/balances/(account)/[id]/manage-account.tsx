'use client'

import { useQuery } from '@tanstack/react-query'

import { getAccount } from '@/api/get-account'
import { Button } from '@/components/ui/button'
import { CardContent, CardFooter } from '@/components/ui/card'
import { AccountTypes } from '@/types'

import { BalanceAccountSkeleton } from './balance-account-skeleton'

export function ManageAccount({ accountId }: { accountId: string }) {
	const { data: account, isLoading: isLoadingAccount } = useQuery({
		queryKey: ['accounts', accountId],
		queryFn: () => getAccount({ id: accountId }),
	})

	return (
		<>
			{isLoadingAccount && <BalanceAccountSkeleton />}

			{account && (
				<>
					<CardContent className="grid grid-cols-3 gap-x-28 gap-y-10 p-6">
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
							<p className="text-muted-foreground">Numero da conta</p>
							<p className="text-lg font-bold">
								{account.number ? account.number : 'Não informado'}
							</p>
						</div>
						<div>
							<p className="text-muted-foreground">Saldo Atual</p>
							<p className="text-lg font-bold">
								{(account.balanceInCents / 100).toLocaleString('pt-BR', {
									style: 'currency',
									currency: 'BRL',
								})}
							</p>
						</div>
					</CardContent>

					<CardFooter className="flex items-center gap-4">
						<Button size="lg" disabled>
							Editar Conta
						</Button>
						<Button size="lg" variant="ghost" disabled={true}>
							Remover
						</Button>
					</CardFooter>
				</>
			)}
		</>
	)
}
