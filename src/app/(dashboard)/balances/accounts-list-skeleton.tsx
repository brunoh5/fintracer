import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function AccountsListSkeleton() {
	return (
		<Card className="h-72">
			<CardHeader className="flex flex-row items-center justify-between">
				<CardTitle className="inline-block">
					<Skeleton className="h-5 w-[100px]" />
				</CardTitle>
				<CardDescription className="font-medium">
					<Skeleton className="h-4 w-[80px]" />
				</CardDescription>
			</CardHeader>
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
		</Card>
	)
}
