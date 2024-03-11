'use client'

import { useQuery } from '@tanstack/react-query'
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { getSession } from 'next-auth/react'
import { useState } from 'react'

import { fetchAccounts } from '@/app/api/fetch-accounts'
import { AccountProps } from '@/types'

import { AccountListSkeleton } from './account-list-skeleton'

export function AccountList() {
	const [currentPage, setCurrentPage] = useState(0)

	const { data: accounts, isLoading } = useQuery<AccountProps[]>({
		queryKey: ['total-balance/accounts'],
		queryFn: async () => {
			const session = await getSession()

			return fetchAccounts({ session })
		},
	})

	return (
		<>
			<div className="overflow-hidden">
				{isLoading ? (
					<AccountListSkeleton />
				) : (
					accounts?.map((account, index) => (
						<div
							key={account.id}
							data-index={index === currentPage}
							className="hidden items-center justify-between rounded bg-primary p-4 data-[index=true]:flex"
						>
							{/* Account */}
							<div className="flex flex-col">
								<span className="text-white/70">Tipo de conta</span>
								<p className="text-white">{account.type}</p>
								<span className="text-white/70">{account.number}</span>
							</div>
							<div className="flex flex-col items-end justify-between gap-4">
								<div className="flex items-center justify-between gap-2 self-end">
									<span className="font-bold text-white">
										{account.balance.toLocaleString('pt-BR', {
											style: 'currency',
											currency: 'BRL',
											maximumFractionDigits: 2,
										})}
									</span>
									<Link href={`/balances/${account.id}`}>
										<ArrowUpRight
											size={16}
											className="rounded-full bg-white text-primary"
										/>
									</Link>
								</div>
							</div>
						</div>
					))
				)}
			</div>

			<div className="mt-2 flex items-center justify-between">
				<button
					onClick={() => {
						if (currentPage > 0) {
							setCurrentPage(currentPage - 1)
						}
					}}
					className="flex items-center justify-center text-[#D1D1D1]"
					aria-label="previous account view"
				>
					<ChevronLeft size={16} />
					Previous
				</button>
				{/* <span>
          {pages.map((page) => (
            <p
              key={page}
              className="w-2 h-2 rounded-full bg-zinc-400 data-[active=true]:bg-green-700"
              data-active={page === currentPage}
              onClick={() => {
                if (currentPage !== page) {
                  setCurrentPage(page)
                }
              }}
            />
          ))}
        </span> */}

				<div className="flex items-center justify-center space-x-2">
					{accounts &&
						accounts.map((_, index) => (
							<p
								key={index}
								data-active={index === currentPage}
								className="h-2 w-2 rounded-full bg-muted-foreground data-[active=true]:bg-primary"
							/>
						))}
				</div>

				<button
					onClick={() => {
						if (accounts?.length && currentPage < accounts.length - 1) {
							setCurrentPage(currentPage + 1)
						}
					}}
					className="flex items-center justify-center"
					aria-label="next account view"
				>
					Next
					<ChevronRight size={16} className="text-eerie-black-900" />
				</button>
			</div>
		</>
	)
}
