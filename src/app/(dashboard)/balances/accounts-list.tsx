'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { ChevronRight } from 'lucide-react'

import { deleteAccount } from '@/app/api/delete-account'
import { fetchAccounts, FetchAccountsResponse } from '@/app/api/fetch-accounts'
import { NavLink } from '@/components/nav-link'
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
		onMutate: async ({ id }) => {
			const cached = queryClient.getQueryData<FetchAccountsResponse>([
				'resume-accounts',
			])

			if (cached) {
				const deletedAccount = cached.accounts.find(
					(account) => account.id !== id,
				)

				queryClient.setQueryData(['resume-accounts'], {
					...cached,
					accounts: deletedAccount,
				})
			}

			return {
				previousAccounts: cached,
			}
		},
		onError: (_, __, context) => {
			if (context?.previousAccounts) {
				queryClient.setQueryData(['resume-accounts'], context.previousAccounts)
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
										{account.number && (
											<>
												<p className="text-xl font-bold">{account.number}</p>
												<span className="text-xs text-gray-300">
													Numero da conta
												</span>
											</>
										)}
									</div>
									<div>
										<p className="text-xl font-bold">
											{Number(account.balance).toLocaleString('pt-BR', {
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
										<NavLink
											href={`/balances/${account.id}`}
											className="flex items-center gap-2 text-primary-foreground"
										>
											Detalhes
											<ChevronRight size={24} />
										</NavLink>
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
