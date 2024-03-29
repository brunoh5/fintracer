'use client'

import { useQuery } from '@tanstack/react-query'
import { MoreVertical, UserCircleIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { getProfile } from '@/api/get-profile'
import { UserProps } from '@/types'

import { ProfileSkeleton } from './profile-skeleton'

export function Profile() {
	const { data: user, isLoading } = useQuery<UserProps>({
		queryKey: ['profile'],
		queryFn: getProfile,
		staleTime: Infinity,
	})

	return (
		<div className="mt-auto flex flex-col divide-y">
			{isLoading ? (
				<ProfileSkeleton />
			) : (
				<div className="flex items-center py-8">
					{user?.avatar_url ? (
						<Image
							src={user.avatar_url ? user.avatar_url : ''}
							alt="Profile Picture"
							width={32}
							height={32}
							className="overflow-hidden rounded-full"
						/>
					) : (
						<UserCircleIcon />
					)}
					<div className="relative ml-4 flex-1">
						<div className="mr-8 flex w-full flex-col">
							<span className="overflow-hidden text-sm text-foreground">
								{user?.name}
							</span>
							<Link href="/settings" className="text-xs text-muted-foreground">
								Ver Perfil
							</Link>
						</div>
						<MoreVertical className="absolute right-0 top-1 text-muted-foreground" />
					</div>
				</div>
			)}
		</div>
	)
}
