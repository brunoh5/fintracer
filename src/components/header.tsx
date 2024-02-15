'use client'

import { useQuery } from '@tanstack/react-query'
import dayJs from 'dayjs'
import { Bell, ChevronsRight, Search } from 'lucide-react'
import { getSession } from 'next-auth/react'

import { api } from '@/services/api'
import { UserProps } from '@/types'

import { ThemeSwitch } from './theme-switch'
import { Button } from './ui/button'
import { Input } from './ui/input'

interface HeaderProps {
	hasName?: boolean
}

export function Header({ hasName = false }: HeaderProps) {
	const { data: user } = useQuery<UserProps>({
		queryKey: ['profile'],
		queryFn: async () => {
			const session = await getSession()

			const response = await api.get('/me', {
				headers: {
					Authorization: `Bearer ${session?.user}`,
				},
			})

			return response.data.user
		},
		staleTime: Infinity,
	})

	return (
		<header className="flex h-[88px] items-center justify-between pb-5 pl-6 pr-8 pt-5">
			<div className="flex items-center justify-center gap-6">
				{hasName && (
					<span className="text-xl font-bold">
						Bem vindo{' '}
						<span className="capitalize">
							{user ? user.name.split(' ', 1) : 'Visitante'}!
						</span>
					</span>
				)}
				<div className="flex items-center justify-center gap-2 text-muted-foreground">
					<ChevronsRight />
					<span>{dayJs().format('DD MMM, YYYY')}</span>
				</div>
			</div>
			<div className="hidden h-[416px] items-center justify-between gap-8 sm:flex">
				<ThemeSwitch />
				<Bell />
				<div className="flex justify-center gap-2">
					<Input className="w-full rounded bg-card" />
					<Button type="button" variant="ghost">
						<Search size={24} className="text-[#999DA3]" />
					</Button>
				</div>
			</div>
		</header>
	)
}
