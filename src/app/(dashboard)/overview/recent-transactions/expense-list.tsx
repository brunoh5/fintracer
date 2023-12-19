'use client'

import { useQuery } from '@tanstack/react-query'
import { getSession } from 'next-auth/react'

import { TransactionProps } from '@/types'
import { api } from '@/services/api'
import { Transaction } from './components/transaction'

export function Expenses() {
	const { data: transactions } = useQuery<TransactionProps[]>({
		queryKey: ['recent-transactions'],
		queryFn: async () => {
			const session = await getSession()

			const response = await api.get('/users/transactions?type=expense', {
				headers: { Authorization: `Bearer ${session?.user}` },
			})

			return response.data.transactions
		},
	})

	return (
		<div className="flex flex-1 flex-col divide-y divide-[#F3F3F3] pb-2">
			{transactions &&
				transactions?.map((transaction) => {
					if (transaction.type === 'sent') {
						return (
							<Transaction key={transaction.id} transaction={transaction} />
						)
					} else {
						return null
					}
				})}
		</div>
	)
}
