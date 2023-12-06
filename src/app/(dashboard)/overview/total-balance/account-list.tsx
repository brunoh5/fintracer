'use client'

import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import Cookies from 'js-cookie'
import { formatPrice } from '@/utils/format-price'
import { useState } from 'react'
import { Account } from '.'
import { api } from '@/services/api'
import { useQuery } from '@tanstack/react-query'

export function AccountList() {
	const [currentPage, setCurrentPage] = useState(0)

	const token = Cookies.get('token')

	const { data: accounts } = useQuery<Account[]>({
		queryKey: ['total-balance/accounts'],
		queryFn: async () => {
			const response = await api.get('/accounts', {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})

			return response.data.accounts
		},
		staleTime: 1000 * 60 * 5,
	})

	return (
		<>
			<div className="overflow-hidden">
				{accounts?.map((account, index) => (
					<div
						key={account.id}
						data-index={index === currentPage}
						className="items-center justify-between rounded bg-persian-green p-4 hidden data-[index=true]:flex"
					>
						{/* Account */}
						<div className="flex flex-col">
							<span className="text-white/70">Tipo de conta</span>
							<p className="text-white">{account.type}</p>
							<span className="text-white/70">{account.number}</span>
						</div>
						<div className="flex flex-col justify-between">
							<Image
								src="/mastercard.png"
								alt="Mastercard"
								width={12}
								height={12}
								className="self-end"
							/>
							<div className="self flex items-center justify-between">
								<span className="text-white">
									{formatPrice(account.balance)}
								</span>
								<ArrowUpRight
									size={16}
									className="rounded-full bg-white text-persian-green"
								/>
							</div>
						</div>
					</div>
				))}
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
								className="w-2 h-2 rounded-full bg-zinc-400 data-[active=true]:bg-green-700"
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
