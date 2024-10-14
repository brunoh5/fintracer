'use client'

import { useQuery } from '@tanstack/react-query'
import { UserCircleIcon } from 'lucide-react'
import Link from 'next/link'

import { getProfile } from '@/api/get-profile'
import type { UserProps } from '@/types'

import { Button } from '../ui/button'
import { Skeleton } from '../ui/skeleton'

export function Profile() {
	const { data: user, isLoading } = useQuery<UserProps>({
		queryKey: ['profile'],
		queryFn: getProfile,
		staleTime: 60 * 60 * 5,
	})

	return (
		<div className="mt-auto space-y-1">
			<div className="flex items-center gap-4">
				<UserCircleIcon className="size-6" />
				<div className="flex flex-col text-ellipsis">
					{isLoading && <Skeleton className="h-4 w-[80px]" />}

					{user && (
						<p className="w-[110px] overflow-hidden text-ellipsis text-nowrap text-sm text-foreground">
							{user.name}
						</p>
					)}
					<Link href="/settings">
						<Button type="button" variant="ghost" size="xs">
							Ver Perfil
						</Button>
					</Link>
				</div>
			</div>
		</div>
	)
}
