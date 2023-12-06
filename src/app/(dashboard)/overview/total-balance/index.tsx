'use client'

import { useQuery } from '@tanstack/react-query'
import Cookies from 'js-cookie'
import Link from 'next/link'
import { Suspense, useState } from 'react'

import { formatPrice } from '@/lib/formatPrice'
import { api } from '@/services/api'
import { AccountList } from './account-list'
import { AccountListSkeleton } from './account-list-skeleton'

export type Account = {
	id: string
	type: string
	number: string
	balance: number
}

export function TotalBalance() {
	const token = Cookies.get('token')
	const [totalBalance, setTotalBalance] = useState(0)

	const { data: accounts } = useQuery<Account[]>({
		queryKey: ['accounts'],
		queryFn: async () => {
			const response = await api.get('/accounts', {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})

			const { accounts } = response.data

			const totalBalance = accounts.reduce((acc: number, account: Account) => {
				return (acc += Number(account.balance))
			}, 0)

			setTotalBalance(totalBalance)

			return accounts
		},
		staleTime: 1000 * 60 * 5,
	})

	return (
		<div className="w-full">
			<h2 className="mb-2 text-[22px] text-gray-500">Balanço Geral</h2>
			<div className="flex h-[232px] w-full flex-col gap-3 rounded-lg bg-white px-6 py-5">
				<div className="flex items-center justify-between border-b border-[#F3F3F3] pb-3">
					<span className="text-[22px] font-bold text-eerie-black-900">
						{formatPrice(totalBalance)}
					</span>
					<Link href="/balances" className="text-xs text-gray-900">
						Todas as contas
					</Link>
				</div>

				<Suspense fallback={<AccountListSkeleton />}>
					{accounts?.length !== 0 ? (
						<AccountList accounts={accounts} />
					) : (
						<div className="flex justify-center items-center rounded bg-persian-green p-4 text-zinc-50 h-full">
							<p>Nenhuma conta criada ainda</p>
						</div>
					)}
				</Suspense>
			</div>
		</div>
	)
}
