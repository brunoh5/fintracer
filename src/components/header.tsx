'use client'

import dayJs from 'dayjs'
import { Bell, ChevronsRight } from 'lucide-react'
import { api } from '@/services/api'
import { useSuspenseQuery } from '@tanstack/react-query'
import { UserProps } from '@/types'
import { SearchInput } from './search-input'
import { useSession } from 'next-auth/react'
import { Session } from 'next-auth'

interface HeaderProps {
	hasName?: boolean
}

export function Header({ hasName = false }: HeaderProps) {
	const { data: session } = useSession()

	// const { data: user } = useSuspenseQuery<UserProps>({
	// 	queryKey: ['profile', session],
	// 	queryFn: async () => {
	// 		const session =

	// 		const response = await api.get('/me', {
	// 			headers: {
	// 				Authorization: `Bearer ${session?.user}`,
	// 			},
	// 		})

	// 		return response.data.user
	// 	},
	// 	staleTime: 1000 * 60 * 60 * 24, // 1 day
	// })

	const user = {
		name: 'Testing',
		avatar_url: '',
	}

	console.log(session)

	return (
		<header className="flex h-[88px] items-center justify-between pb-5 pl-6 pr-8 pt-5">
			<div className="flex items-center justify-center gap-6">
				{hasName && (
					<span className="text-xl text-eerie-black-900">
						Bem vindo{' '}
						<span className="capitalize">
							{user ? user.name : 'Visitante'}!
						</span>
					</span>
				)}
				<div className="flex items-center justify-center text-gray-300 gap-2">
					<ChevronsRight />
					<span>{dayJs().format('DD MMM, YYYY')}</span>
				</div>
			</div>
			<div className="flex h-[416px] items-center justify-between gap-8">
				<Bell />
				<SearchInput />
			</div>
		</header>
	)
}
