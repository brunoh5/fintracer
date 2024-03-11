'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { ChevronRight } from 'lucide-react'
import { getSession } from 'next-auth/react'

import { deleteAccount } from '@/app/api/delete-account'
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
import { api } from '@/lib/axios'
import { AccountProps } from '@/types'

import { AccountsListSkeleton } from './accounts-list-skeleton'

export function AccountList() {
	const queryClient = useQueryClient()

	const { data: accounts, isLoading } = useQuery<AccountProps[]>({
		queryKey: ['balance', 'accounts'],
		queryFn: async () => {
			const session = await getSession()

			const response = await api.get('/accounts', {
				headers: {
					Authorization: `Bearer ${session?.user}`,
				},
			})

			return response.data.accounts
		},
	})

	const { mutateAsync: deleteAccountFn } = useMutation({
		mutationFn: deleteAccount,
		onMutate: async () => {
			await queryClient.cancelQueries({ queryKey: ['balance', 'accounts'] })

			const previousAccounts = queryClient.getQueryData(['balance', 'accounts'])

			queryClient.setQueryData(
				['balance', 'accounts'],
				(old: AccountProps[]) => [...old],
			)

			return previousAccounts
		},
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		onError: (_, __, context: any) => {
			queryClient.setQueryData(
				['balance', 'accounts'],
				context.previousAccounts,
			)
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ['balance', 'accounts'] })
		},
	})

	async function handleDeleteAccount(id: string) {
		const session = await getSession()

		await deleteAccountFn({ session, id })
	}

	return (
		<>
			{isLoading ? (
				<AccountsListSkeleton />
			) : (
				accounts?.map((account, index) => (
					<Card key={index} className="h-72">
						<CardHeader className="flex flex-row items-center justify-between">
							<CardTitle className="inline-block">{account.type}</CardTitle>
							<CardDescription className="font-medium">
								{account.bank}
							</CardDescription>
						</CardHeader>
						<CardContent>
							<Separator />

							<div className="mt-4 flex w-full flex-col gap-6">
								<div className="flex flex-col gap-4">
									<div>
										<p className="text-xl font-bold">{account.number}</p>
										<span className="text-xs text-gray-300">
											Account Number
										</span>
									</div>
									<div>
										<p className="text-xl font-bold">
											{Number(account.balance).toLocaleString('pt-BR', {
												style: 'currency',
												currency: 'BRL',
											})}
										</p>
										<span className="text-xs text-gray-300">Total amount</span>
									</div>
								</div>
								<div className="flex items-center justify-between">
									<Button
										onClick={() => handleDeleteAccount(account.id)}
										variant="secondary"
									>
										Remove
									</Button>

									<Button asChild>
										<NavLink href={`/balances/${account.id}`}>
											Details
											<ChevronRight size={16} />
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
