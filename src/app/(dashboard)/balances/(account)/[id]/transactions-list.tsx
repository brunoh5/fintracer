'use client'

import { useQuery } from '@tanstack/react-query'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { z } from 'zod'

import { fetchTransactions } from '@/api/fetch-transactions'
import { TransactionTableRow } from '@/app/(dashboard)/transactions/transaction-table-row'
import { Pagination } from '@/components/pagination'
import { TransactionTableSkeleton } from '@/components/transaction-table-skeleton'
import {
	Table,
	TableBody,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'

interface TransactionsListProps {
	accountId: string
}

export function TransactionsList({ accountId }: TransactionsListProps) {
	const searchParams = useSearchParams()
	const { replace } = useRouter()
	const pathname = usePathname()
	const params = new URLSearchParams(searchParams)

	const transaction_type = params.get('transaction_type')

	const pageIndex = z.coerce
		.number()
		.transform((page) => page - 1)
		.parse(params.get('page') ?? '1')

	const { data: result, isLoading: isLoadingTransactions } = useQuery({
		queryKey: ['transactions', accountId, pageIndex, transaction_type],
		queryFn: () =>
			fetchTransactions({ pageIndex, transaction_type, accountId }),
	})

	function handlePaginate(pageIndex: number) {
		const params = new URLSearchParams(searchParams)

		params.set('page', (pageIndex + 1).toString())

		replace(`${pathname}?${params.toString()}`)
	}

	return (
		<div className="space-y-2.5">
			<div className="rounded-md border">
				<Table>
					<TableHeader className="font-bold">
						<TableRow>
							<TableHead className="w-[80px]"></TableHead>
							<TableHead>Nome</TableHead>
							<TableHead className="w-[140px] text-center">
								Estabelecimento
							</TableHead>
							<TableHead className="w-[140px] text-center">Categoria</TableHead>
							<TableHead className="w-[140px] ">Data</TableHead>
							<TableHead className="w-[140px] ">Pagamento</TableHead>
							<TableHead className="w-[140px] text-center">Valor</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{isLoadingTransactions && <TransactionTableSkeleton />}

						{result &&
							result.transactions.map((transaction) => {
								return (
									<TransactionTableRow
										key={transaction.id}
										transaction={transaction}
									/>
								)
							})}
					</TableBody>
				</Table>
			</div>

			{result && (
				<Pagination
					pageIndex={result.meta.pageIndex}
					totalCount={result.meta.totalCount}
					perPage={result.meta.perPage}
					onPageChange={handlePaginate}
				/>
			)}
		</div>
	)
}
