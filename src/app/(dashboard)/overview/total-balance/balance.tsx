'use client'

import { useQuery } from '@tanstack/react-query'
import { getSession } from 'next-auth/react'

import { Skeleton } from '@/components/ui/skeleton'
import { api } from '@/services/api'
import { AccountProps } from '@/types'

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
				<span className="text-xl font-bold">
					{totalBalance?.toLocaleString('pt-BR', {
						style: 'currency',
						currency: 'BRL',
					})}
				</span>
			)}
		</>
	)
}
