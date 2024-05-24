'use client'

import { useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { ChevronsRight } from 'lucide-react'
import { usePathname } from 'next/navigation'

import { getProfile } from '@/api/get-profile'

import { ThemeSwitch } from './theme-switch'
import { Skeleton } from './ui/skeleton'

export function Header() {
	const pathname = usePathname()

	const { data: user, isLoading } = useQuery({
		queryKey: ['profile'],
		queryFn: getProfile,
		staleTime: Infinity,
	})

	const isOverviewVisible = pathname === '/overview'

	return (
		<header className="flex h-[88px] items-center justify-between pb-5 pl-6 pr-8 pt-5">
			<div className="flex items-center justify-center gap-6">
				{isOverviewVisible && (
					<span className="text-nowrap text-xl font-bold">
						Bem vindo,{' '}
						{isLoading ? (
							<Skeleton className="w-42 h-2" />
						) : (
							<span className="capitalize">
								{user ? user?.name.split(' ', 1) : 'visitante'}!
							</span>
						)}
					</span>
				)}

				<div
					className={`${isOverviewVisible ? 'hidden' : 'flex'} items-center justify-center gap-2 text-muted-foreground lg:flex`}
				>
					<ChevronsRight />
					<span className="text-nowrap">
						{format(new Date(), 'dd MMM, yyyy', {
							locale: ptBR,
						})}
					</span>
				</div>
			</div>
			<div className="hidden h-[416px] items-center justify-between gap-8 lg:flex">
				<ThemeSwitch />
			</div>
		</header>
	)
}
