'use client'

import dayJs from 'dayjs'
import Cookies from 'js-cookie'
import {
    Car,
    Clapperboard,
    LayoutDashboard,
    ShoppingBag,
    Utensils,
} from 'lucide-react'
import { useEffect, useState } from 'react'

import { api } from '@/services/api'

type Transaction = {
	id: string
	category: {
		name: string
	}
	name: string
	shopName: string
	amount: number
	date: Date
}

export function RecentTransactionsList() {
	const [transactions, setTransactions] = useState<Transaction[]>([])

	useEffect(() => {
		const token = Cookies.get('token')

		api
			.get('/users/transactions', {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then((res) => {
				console.log(res.data.transactions)
				setTransactions([...res.data.transactions])
			})
	}, [])

	return (
		<div className="flex flex-1 flex-col divide-y divide-[#F3F3F3] pb-2">
			{transactions.map((transaction, index) => (
				<div
					key={index}
					className="flex items-center justify-between gap-7 py-6"
				>
					<div className="flex items-center gap-4">
						<div className="p-2">
							{transaction.category.name === 'food' && <Utensils />}
							{transaction.category.name === 'transportation' && <Car />}
							{transaction.category.name === 'entertainment' && (
								<Clapperboard />
							)}
							{transaction.category.name === 'shopping' && <ShoppingBag />}
							{transaction.category.name === 'Others' && <LayoutDashboard />}
							{transaction.category.name === 'Others' && <LayoutDashboard />}
						</div>
						<div className="flex flex-col">
							<p className="font-semibold">{transaction.name}</p>
							<span className="text-xs text-gray-300">
								{transaction.shopName}
							</span>
						</div>
					</div>
					<div className="flex flex-col items-end">
						<span className="font-semibold text-gray-900">
							{new Intl.NumberFormat('pt-BR', {
								style: 'currency',
								currency: 'BRL',
							}).format(transaction.amount)}
						</span>
						<span className="text-xs text-gray-300">
							{dayJs(transaction.date).format('MMM DD YYYY')}
						</span>
					</div>
				</div>
			))}
		</div>
	)
}
