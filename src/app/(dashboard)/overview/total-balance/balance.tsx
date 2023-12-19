'use client'

import { useQuery } from '@tanstack/react-query'
import { getSession } from 'next-auth/react'

import { api } from '@/services/api'
import { formatPrice } from '@/utils/format-price'
import { AccountProps } from '@/types'
import { Skeleton } from '@/components/ui/skeleton'

export function Balance() {
	const { data: totalBalance, isLoading } = useQuery<number>({
		queryKey: ['balance'],
		queryFn: async () => {
			const session = await getSession()

			const response = await api.get('/accounts', {
				headers: {
					Authorization: `Bearer ${session?.user}`,
				},
			})

			const { accounts } = response.data

			const totalBalance = accounts.reduce(
				(acc: number, account: AccountProps) => {
					return (acc += Number(account.balance))
				},
				0,
			)

			return totalBalance
		},
	})

	return (
		<>
			{isLoading ? (
				<Skeleton />
			) : (
				<span className="text-[22px] font-bold text-eerie-black-900">
					{formatPrice(totalBalance ?? 0)}
				</span>
			)}
		</>
	)
}
