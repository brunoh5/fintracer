import { CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function BalanceAccountSkeleton() {
	return (
		<CardContent>
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
		</CardContent>
	)
}
