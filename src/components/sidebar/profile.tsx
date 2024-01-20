'use client'

import { useQuery } from '@tanstack/react-query'
import { MoreVertical, UserCircleIcon } from 'lucide-react'
import Image from 'next/image'
import { getSession } from 'next-auth/react'

import { api } from '@/services/api'
import { UserProps } from '@/types'

import { ProfileSkeleton } from './profile-skeleton'

export function Profile() {
	const { data: user, isLoading } = useQuery<UserProps>({
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
		staleTime: 1000 * 60 * 60 * 24, // 1 day
	})

	return (
		<>
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
							<span className="overflow-hidden text-sm text-white">
								{user?.name}
							</span>
							<span className="text-xs text-white/20">View Profile</span>
						</div>
						<MoreVertical className="absolute right-0 top-1 text-white" />
					</div>
				</div>
			)}
		</>
	)
}
