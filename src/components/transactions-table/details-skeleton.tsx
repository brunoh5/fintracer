import { Skeleton } from '@/components/ui/skeleton'
import { TableBody, TableCell, TableRow } from '@/components/ui/table'

export function TransactionDetailsSkeleton() {
	return (
		<TableBody>
			<TableRow>
				<TableCell>Nome</TableCell>
				<TableCell className="flex justify-end">
					<Skeleton className="h-4 w-[140px]" />
				</TableCell>
			</TableRow>
			<TableRow>
				<TableCell>Estabelecimento</TableCell>
				<TableCell className="flex justify-end">
					<Skeleton className="h-4 w-[140px]" />
				</TableCell>
			</TableRow>
			<TableRow>
				<TableCell>Categoria</TableCell>
				<TableCell className="flex justify-end">
					<Skeleton className="h-4 w-[140px]" />
				</TableCell>
			</TableRow>
			<TableRow>
				<TableCell>Realizado</TableCell>
				<TableCell className="flex justify-end">
					<Skeleton className="h-4 w-[140px]" />
				</TableCell>
			</TableRow>
			<TableRow>
				<TableCell>Método de pagamento</TableCell>
				<TableCell className="flex justify-end">
					<Skeleton className="h-4 w-[140px]" />
				</TableCell>
			</TableRow>
			<TableRow>
				<TableCell>Valor</TableCell>
				<TableCell className="flex justify-end">
					<Skeleton className="h-4 w-[140px]" />
				</TableCell>
			</TableRow>
		</TableBody>
	)
}
