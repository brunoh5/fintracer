'use client'

import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { TransactionsList } from './transaction-list'
import { useState } from 'react'
import { RevenueList } from './revenue-list'
import { Expenses } from './expense-list'

export function RecentTransaction() {
	const [activeTab, setActiveTab] = useState('all')

	return (
		<div className="h-[582px] w-full max-w-[352px]">
			<div className="flex items-center justify-between">
				<h2 className="mb-2 text-[22px] text-gray-500">Transações Recentes</h2>
				<div className="flex items-center text-gray-500">
					<Link className="text-xs" href="/transactions">
						Ver todas
					</Link>
					<ChevronRight size={16} />
				</div>
			</div>

			<div className="flex h-[542px] flex-col gap-3 rounded-lg bg-white px-6 pb-8 pt-4">
				<div className="flex items-center justify-between font-bold text-gray-900">
					<span
						onClick={() => setActiveTab('all')}
						data-active={activeTab === 'all'}
						className="data-[active=true]:border-b-2 data-[active=true]:border-persian-green p-2 data-[active=true]:text-persian-green cursor-pointer"
					>
						Todos
					</span>
					<span
						onClick={() => setActiveTab('revenues')}
						data-active={activeTab === 'revenues'}
						className="data-[active=true]:border-b-2 data-[active=true]:border-persian-green p-2 data-[active=true]:text-persian-green cursor-pointer"
					>
						Receita
					</span>
					<span
						onClick={() => setActiveTab('expenses')}
						data-active={activeTab === 'expenses'}
						className="data-[active=true]:border-b-2 data-[active=true]:border-persian-green p-2 data-[active=true]:text-persian-green cursor-pointer"
					>
						Despesa
					</span>
				</div>

				{activeTab === 'all' && <TransactionsList />}

				{activeTab === 'revenues' && <RevenueList />}

				{activeTab === 'expenses' && <Expenses />}
			</div>
		</div>
	)
}
