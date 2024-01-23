import { Skeleton } from '@/components/ui/skeleton'

export function AccountsListSkeleton() {
	return (
		<div className="h-72 rounded-lg bg-white p-6">
			<div className="flex items-center justify-between border-b border-[#D2D2D2]/25 pb-3">
				<Skeleton className="h-5 w-[100px]" />
				<div className="flex items-center gap-1">
					<Skeleton className="h-4 w-[80px]" />
				</div>
			</div>
			<div className="mt-4 flex w-full flex-col gap-6">
				<div className="flex flex-col gap-4">
					<div>
						<Skeleton className="h-7 w-full" />
						<span className="text-xs text-gray-300">Account Number</span>
					</div>
					<div>
						<Skeleton className="h-7 w-full" />
						<span className="text-xs text-gray-300">Total amount</span>
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
