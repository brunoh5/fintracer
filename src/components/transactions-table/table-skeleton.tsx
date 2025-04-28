import { Ellipsis } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { TableCell, TableRow } from '@/components/ui/table'

export function TransactionTableSkeleton() {
	return Array.from({ length: 10 }).map((_, i) => {
		return (
			// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
			<TableRow key={i}>
				<TableCell className="w-[128px]">
					<Skeleton className="mx-auto h-5 w-[120px]" />
				</TableCell>
				<TableCell>
					<Skeleton className="h-3 w-full" />
				</TableCell>
				<TableCell className="w-[144px]">
					<Skeleton className="mx-auto h-3 w-[140px]" />
				</TableCell>
				<TableCell className="w-[144px]">
					<Skeleton className="mx-auto h-3 w-[140px]" />
				</TableCell>
				<TableCell className="w-[144px]">
					<Skeleton className="mx-auto h-3 w-[140px]" />
				</TableCell>
				<TableCell className="flex w-[96px] justify-center">
					<Button variant="outline" size="sm" disabled={true}>
						<Ellipsis className="size-3" />
						<span className="sr-only">Detalhes das transações</span>
					</Button>
				</TableCell>
			</TableRow>
		)
	})
}
