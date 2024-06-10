'use client'

import Link from 'next/link'

import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useFetchAccounts } from '@/features/accounts/api/use-fetch-accounts'
import { AccountTypes } from '@/types'

import { AccountsListSkeleton } from './accounts-list-skeleton'

export function AccountList() {
	const { data, isLoading } = useFetchAccounts()

	return (
		<div className="flex w-full flex-col gap-y-6 lg:grid lg:grid-cols-3 lg:grid-rows-[288px] lg:gap-8">
			{isLoading ? (
				<AccountsListSkeleton />
			) : (
				data?.accounts?.map((account) => (
					<Card key={account.id} className="h-72">
						<CardHeader className="flex flex-row items-center justify-between">
							<CardTitle className="inline-block">
								{AccountTypes[account?.type as keyof typeof AccountTypes]}
							</CardTitle>
							<CardDescription className="font-medium">
								{account.bank}
							</CardDescription>
						</CardHeader>
						<CardContent>
							<Separator />

							<div className="mt-4 flex w-full flex-col gap-6">
								<div className="flex flex-col gap-4">
									<div className="h-[52px]">
										<p className="text-xl font-bold">
											{account.number ? (
												<span>{account.number}</span>
											) : (
												<span>Não informado</span>
											)}
										</p>
										<span className="text-xs text-gray-300">
											Numero da conta
										</span>
									</div>
									<div>
										<p className="text-xl font-bold">
											{(account.balance / 100).toLocaleString('pt-BR', {
												style: 'currency',
												currency: 'BRL',
											})}
										</p>
										<span className="text-xs text-gray-300">
											Total na conta
										</span>
									</div>
								</div>
								<Button
									type="button"
									asChild
									className="flex w-full items-center text-white"
								>
									<Link href={`/balances/${account.id}`}>
										Detalhes da conta
									</Link>
								</Button>
							</div>
						</CardContent>
					</Card>
				))
			)}
		</div>
	)
}
