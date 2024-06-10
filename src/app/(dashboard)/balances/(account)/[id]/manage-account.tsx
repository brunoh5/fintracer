'use client'

import { Button } from '@/components/ui/button'
import { CardContent, CardFooter } from '@/components/ui/card'
import { useGetAccount } from '@/features/accounts/api/use-get-account'
import { useOpenAccount } from '@/features/accounts/hooks/use-open-account'
import { AccountTypes } from '@/types'

import { BalanceAccountSkeleton } from './balance-account-skeleton'

export function ManageAccount({ accountId }: { accountId: string }) {
	const { data, isLoading } = useGetAccount(accountId)
	const { onOpen } = useOpenAccount()

	return (
		<>
			{isLoading && <BalanceAccountSkeleton />}

			{data?.account && (
				<>
					<CardContent className="grid grid-cols-3 gap-x-28 gap-y-10 p-6">
						<div>
							<p className="text-muted-foreground">Nome do Banco</p>
							<p className="text-lg font-bold">{data.account?.bank}</p>
						</div>
						<div>
							<p className="text-muted-foreground">Tipo da conta</p>
							<p className="text-lg font-bold">
								{AccountTypes[data.account?.type as keyof typeof AccountTypes]}
							</p>
						</div>
						{data.account.number && (
							<div>
								<p className="text-muted-foreground">Numero da conta</p>
								<p className="text-lg font-bold">
									{data.account.number ? data.account.number : 'Não informado'}
								</p>
							</div>
						)}
						<div>
							<p className="text-muted-foreground">Saldo Atual</p>
							<p className="text-lg font-bold">
								{(data.account.balanceInCents / 100).toLocaleString('pt-BR', {
									style: 'currency',
									currency: 'BRL',
								})}
							</p>
						</div>
					</CardContent>

					<CardFooter className="flex items-center gap-4">
						<Button
							className="flex items-center text-white"
							type="button"
							onClick={() => onOpen(accountId)}
						>
							Editar Conta
						</Button>
					</CardFooter>
				</>
			)}
		</>
	)
}
