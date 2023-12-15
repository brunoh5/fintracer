'use client'

import { TransactionProps } from '@/types'
import { api } from '@/services/api'
import { useSuspenseQuery } from '@tanstack/react-query'
import Cookies from 'js-cookie'
import { Transaction } from './components/transaction'

export function RevenueList() {
	const token = Cookies.get('token')

	const { data: transactions } = useSuspenseQuery<TransactionProps[]>({
		queryKey: ['recent-transactions'],
		queryFn: async () => {
			const response = await api.get('/users/transactions', {
				headers: { Authorization: `Bearer ${token}` },
			})

			return response.data.transactions
		},
		staleTime: 1000 * 60 * 5,
	})

	return (
		<div className="flex flex-1 flex-col divide-y divide-[#F3F3F3] pb-2">
			{transactions?.map((transaction) => {
				if (transaction.type === 'received') {
					return <Transaction key={transaction.id} transaction={transaction} />
				} else {
					return null
				}
			})}
		</div>
	)
}
