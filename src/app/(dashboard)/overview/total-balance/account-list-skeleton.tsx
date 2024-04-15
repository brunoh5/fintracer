import { ArrowUpRight } from 'lucide-react'

import { CarouselItem } from '@/components/ui/carousel'
import { Skeleton } from '@/components/ui/skeleton'

export function AccountListSkeleton() {
	return (
		<CarouselItem>
			<div className="flex h-24 items-center justify-between rounded-md bg-primary p-4">
				<div>
					<Skeleton className="h-4 w-[90px]" />
					<Skeleton className="h-6 w-[90px]" />
					<Skeleton className="h-4 w-[90px]" />
				</div>
				<div className="flex items-center justify-between gap-2 self-end">
					<Skeleton className="h-4 w-[90px]" />
					<div>
						<ArrowUpRight
							size={16}
							className="rounded-full bg-white text-primary"
						/>
						<span className="sr-only">Detalhes da conta</span>
					</div>
				</div>
			</div>
		</CarouselItem>
	)
}
