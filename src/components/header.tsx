'use client'

import { useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'
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

	return (
		<header className="flex h-[88px] items-center justify-between pb-5 pl-6 pr-8 pt-5">
			<div className="flex items-center justify-center gap-6">
				{pathname === '/overview' && (
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

				<div className="flex items-center justify-center gap-2 text-muted-foreground">
					<ChevronsRight />
					<span className="text-nowrap">
						{format(new Date(), 'dd MMM, yyyy')}
					</span>
				</div>
			</div>
			<div className="flex h-[416px] items-center justify-between gap-8">
				<ThemeSwitch />
				{/* <Bell />
				<div className="flex justify-center gap-2">
					<Input className="w-full rounded bg-card" />
					<Button type="button" variant="ghost">
						<Search size={24} className="text-[#999DA3]" />
					</Button>
				</div> */}
			</div>
		</header>
	)
}
