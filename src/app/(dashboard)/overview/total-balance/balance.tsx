'use client'

import { api } from '@/services/api'
import { formatPrice } from '@/utils/format-price'
import { useQuery } from '@tanstack/react-query'
import Cookies from 'js-cookie'

type Account = {
	id: string
	type: string
	number: string
	balance: number
}

export function Balance() {
	const token = Cookies.get('token')

	const { data: totalBalance } = useQuery<number>({
		queryKey: ['balance'],
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

			return totalBalance
		},
		staleTime: 1000 * 60 * 5,
	})

	return (
		<span className="text-[22px] font-bold text-eerie-black-900">
			{formatPrice(totalBalance ?? 0)}
		</span>
	)
}
