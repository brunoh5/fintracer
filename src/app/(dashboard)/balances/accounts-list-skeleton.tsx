import { Skeleton } from '@/components/ui/skeleton'

export function AccountsListSkeleton() {
	return (
		<div className="rounded-lg bg-white p-6 h-72">
			<div className="flex items-center justify-between pb-3 border-b border-[#D2D2D2]/25">
				<Skeleton className="h-5 w-[100px]" />
				<div className="flex items-center gap-1">
					<Skeleton className="h-4 w-[80px]" />
				</div>
			</div>
			<div className="flex w-full flex-col gap-6 mt-4">
				<div className="flex flex-col gap-4">
					<div>
						<Skeleton className="h-7 w-full" />
						<span className="text-gray-300 text-xs">Account Number</span>
					</div>
					<div>
						<Skeleton className="h-7 w-full" />
						<span className="text-gray-300 text-xs">Total amount</span>
					</div>
				</div>
				<div className="flex items-center justify-between">
					<Skeleton className="h-12 w-[60px]" />
					<Skeleton className="h-12 w-[100px]" />
				</div>
			</div>
		</div>
	)
}
