'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { ChevronRight } from 'lucide-react'

import { deleteAccount } from '@/api/delete-account'
import { fetchAccounts, FetchAccountsResponse } from '@/api/fetch-accounts'
import { NavButton } from '@/components/nav-button'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { AccountTypes } from '@/types'

import { AccountsListSkeleton } from './accounts-list-skeleton'

export function AccountList() {
	const queryClient = useQueryClient()

	const { data: resume, isLoading } = useQuery({
		queryKey: ['resume-accounts'],
		queryFn: fetchAccounts,
	})

	const { mutateAsync: deleteAccountFn } = useMutation({
		mutationFn: deleteAccount,
		async onSuccess(_, { id }) {
			const cached = queryClient.getQueryData<FetchAccountsResponse>([
				'resume-accounts',
			])

			if (cached && cached.accounts) {
				queryClient.setQueryData<FetchAccountsResponse>(['resume-accounts'], {
					...cached,
					accounts: cached.accounts.filter((account) => account.id !== id),
				})
			}
		},
	})

	async function handleDeleteAccount(id: string) {
		await deleteAccountFn({ id })
	}

	return (
		<>
			{isLoading ? (
				<AccountsListSkeleton />
			) : (
				resume?.accounts?.map((account, index) => (
					<Card key={index} className="h-72">
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
								<div className="flex items-center justify-between">
									<Button
										onClick={() => handleDeleteAccount(account.id)}
										variant="secondary"
									>
										Remover
									</Button>

									<Button asChild>
										<NavButton
											href={`/balances/${account.id}`}
											className="flex items-center gap-2 text-primary-foreground"
										>
											Detalhes
											<ChevronRight size={24} />
										</NavButton>
									</Button>
								</div>
							</div>
						</CardContent>
					</Card>
				))
			)}
		</>
	)
}
