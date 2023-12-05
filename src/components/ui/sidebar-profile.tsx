import { useQuery } from '@tanstack/react-query'
import Cookie from 'js-cookie'
import { MoreVertical, UserCircleIcon } from 'lucide-react'
import Image from 'next/image'
import { Suspense } from 'react'

import { api } from '@/services/api'
import { Skeleton } from './skeleton'

type User = {
	name: string
	avatar_url: null
}

function ProfileSkeleton() {
	return (
		<div className="flex items-center py-8">
			<Skeleton className="h-4 w-[40px] rounded-full" />
			<div className="relative ml-4 flex-1">
				<div className="mr-8 flex w-full flex-col">
					<Skeleton className="h-4 w-[80px]" />
					<span className="text-xs text-white/20">View Profile</span>
				</div>
				<MoreVertical className="absolute right-0 top-1 text-white" />
			</div>
		</div>
	)
}

export function SidebarProfile() {
	const token = Cookie.get('token')

	const { data: user } = useQuery<User>({
		queryKey: ['profile'],
		queryFn: async () => {
			const response = await api.get('/me', {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})

			console.log(response.data)

			return response.data.user
		},
		staleTime: 1000 * 60 * 60 * 24, // 1 day
	})

	return (
		<Suspense fallback={<ProfileSkeleton />}>
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
		</Suspense>
	)
}
