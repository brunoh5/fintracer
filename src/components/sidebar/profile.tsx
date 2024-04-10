'use client'

import { useQuery } from '@tanstack/react-query'
import { UserCircleIcon } from 'lucide-react'
import Link from 'next/link'

import { getProfile } from '@/api/get-profile'
import { UserProps } from '@/types'

import { Button } from '../ui/button'
import { Skeleton } from '../ui/skeleton'

export function Profile() {
	const { data: user, isLoading } = useQuery<UserProps>({
		queryKey: ['profile'],
		queryFn: getProfile,
		staleTime: Infinity,
	})

	return (
		<div className="mt-auto">
			<div className="flex items-center gap-4">
				<UserCircleIcon className="size-4" />
				<div className="mr-8 flex w-full flex-col text-ellipsis">
					{isLoading && <Skeleton className="h-4 w-[80px]" />}

					{user && (
						<span className=" text-nowrap text-sm text-foreground">
							{user.name}
						</span>
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
