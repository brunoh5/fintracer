import { Skeleton } from '@/components/ui/skeleton'

export function TransactionListSkeleton() {
	return (
		<>
			<div className="flex items-center justify-between gap-7 py-6">
				<div className="flex items-center gap-4">
					<div className="p-2">
						<Skeleton className="h-6 w-6" />
					</div>
					<div className="flex flex-col">
						<Skeleton className="h-4 w-20" />
						<Skeleton className="h-4 w-20" />
					</div>
				</div>
				<div className="flex flex-col items-end">
					<Skeleton className="h-4 w-20" />
					<Skeleton className="h-4 w-20" />
				</div>
			</div>
			<div className="flex items-center justify-between gap-7 py-6">
				<div className="flex items-center gap-4">
					<div className="p-2">
						<Skeleton className="h-6 w-6" />
					</div>
					<div className="flex flex-col">
						<Skeleton className="h-4 w-20" />
						<Skeleton className="h-4 w-20" />
					</div>
				</div>
				<div className="flex flex-col items-end">
					<Skeleton className="h-4 w-20" />
					<Skeleton className="h-4 w-20" />
				</div>
			</div>
			<div className="flex items-center justify-between gap-7 py-6">
				<div className="flex items-center gap-4">
					<div className="p-2">
						<Skeleton className="h-6 w-6" />
					</div>
					<div className="flex flex-col">
						<Skeleton className="h-4 w-20" />
						<Skeleton className="h-4 w-20" />
					</div>
				</div>
				<div className="flex flex-col items-end">
					<Skeleton className="h-4 w-20" />
					<Skeleton className="h-4 w-20" />
				</div>
			</div>
			<div className="flex items-center justify-between gap-7 py-6">
				<div className="flex items-center gap-4">
					<div className="p-2">
						<Skeleton className="h-6 w-6" />
					</div>
					<div className="flex flex-col">
						<Skeleton className="h-4 w-20" />
						<Skeleton className="h-4 w-20" />
					</div>
				</div>
				<div className="flex flex-col items-end">
					<Skeleton className="h-4 w-20" />
					<Skeleton className="h-4 w-20" />
				</div>
			</div>
			<div className="flex items-center justify-between gap-7 py-6">
				<div className="flex items-center gap-4">
					<div className="p-2">
						<Skeleton className="h-6 w-6" />
					</div>
					<div className="flex flex-col">
						<Skeleton className="h-4 w-20" />
						<Skeleton className="h-4 w-20" />
					</div>
				</div>
				<div className="flex flex-col items-end">
					<Skeleton className="h-4 w-20" />
					<Skeleton className="h-4 w-20" />
				</div>
			</div>
		</>
	)
}
