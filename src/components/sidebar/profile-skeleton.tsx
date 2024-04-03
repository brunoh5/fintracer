import { MoreVertical } from 'lucide-react'

import { Skeleton } from '../ui/skeleton'

export function ProfileSkeleton() {
	return (
		<div className="flex items-center py-8">
			<Skeleton className="h-4 w-[40px] rounded-full" />
			<div className="relative ml-4 flex-1">
				<div className="mr-8 flex w-full flex-col">
					<Skeleton className="h-4 w-[80px]" />
					<span className="text-xs text-muted-foreground">Ver perfil</span>
				</div>
				<MoreVertical className="absolute right-0 top-1 text-white" />
			</div>
		</div>
	)
}
