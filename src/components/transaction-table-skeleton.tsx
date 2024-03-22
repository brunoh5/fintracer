import { Search } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { TableCell, TableRow } from '@/components/ui/table'

export function TransactionTableSkeleton() {
	return Array.from({ length: 10 }).map((_, i) => {
		return (
			<TableRow key={i}>
				<TableCell className="w-[80px]">
					<Button variant="outline" size="xs" disabled={true}>
						<Search className="size-3" />
						<span className="sr-only">Detalhes das transações</span>
					</Button>
				</TableCell>
				<TableCell>
					<Skeleton className="h-3 w-[192px]" />
				</TableCell>
				<TableCell>
					<Skeleton className="h-5 w-[140px]" />
				</TableCell>
				<TableCell>
					<Skeleton className="h-3 w-[140px]" />
				</TableCell>
				<TableCell>
					<Skeleton className="h-3 w-[140px]" />
				</TableCell>
				<TableCell>
					<Skeleton className="h-3 w-[140px]" />
				</TableCell>
				<TableCell>
					<Skeleton className="h-3 w-[140px]" />
				</TableCell>
			</TableRow>
		)
	})
}
