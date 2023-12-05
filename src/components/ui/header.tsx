'use client'

import dayJs from 'dayjs'
import Cookie from 'js-cookie'
import { Bell, ChevronsRight, Search } from 'lucide-react'

import { api } from '@/services/api'
import { useEffect, useState } from 'react'
import { Input } from './Input'

interface HeaderProps {
	hasName?: boolean
}

type User = {
	name: string
	avatar_url?: string | null
}

export function Header({ hasName = false }: HeaderProps) {
	const token = Cookie.get('token')
	const [user, setUser] = useState<User>()

	useEffect(() => {
		api
			.get('/me', {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				setUser(res.data.user)
			})
	}, [token])

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
				<Input.Wrapper>
					<Input.Content
						name="search"
						placeholder="Search here"
						theme="light"
						autoComplete="off"
					/>
					<Input.Icon icon={Search} position="right" />
				</Input.Wrapper>
			</div>
		</header>
	)
}
