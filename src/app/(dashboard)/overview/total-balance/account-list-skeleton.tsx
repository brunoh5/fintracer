import { Skeleton } from '@/components/ui/skeleton'
import { ArrowUpRight } from 'lucide-react'

export function AccountListSkeleton() {
	return (
		<div className="items-center justify-between rounded bg-persian-green p-4 flex">
			<div className="flex flex-col">
				<span className="text-white/70">Tipo de conta</span>
				<Skeleton className="h-4 w-[80px]" />
				<Skeleton className="h-4 w-[80px]" />
			</div>
			<div className="flex flex-col justify-between">
				<div className="self flex items-center justify-between">
					<Skeleton className="h-4 w-[80px]" />
					<ArrowUpRight
						size={16}
						className="rounded-full bg-white text-persian-green"
					/>
				</div>
			</div>
		</div>
	)
}
