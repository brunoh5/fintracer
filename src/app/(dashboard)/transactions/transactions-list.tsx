'use client'

import { useQuery } from '@tanstack/react-query'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { z } from 'zod'

import { fetchTransactions } from '@/api/fetch-transactions'
import { Pagination } from '@/components/pagination'
import { TransactionTableFilters } from '@/components/transaction-table-filters'
import { TransactionTableRow } from '@/components/transaction-table-row'
import { TransactionTableSkeleton } from '@/components/transaction-table-skeleton'
import {
	Table,
	TableBody,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'

export function TransactionsList() {
	const searchParams = useSearchParams()
	const params = new URLSearchParams(searchParams)
	const { replace } = useRouter()
	const pathname = usePathname()

	const name = params.get('name')
	const transaction_type = params.get('transaction_type')
	const payment_method = params.get('payment_method')
	const category = params.get('category')

	const pageIndex = z.coerce
		.number()
		.transform((page) => page - 1)
		.parse(params.get('page') ?? '1')

	const { data: result, isLoading: isLoadingTransactions } = useQuery({
		queryKey: [
			'transactions',
			pageIndex,
			name,
			transaction_type,
			payment_method,
			category,
		],
		queryFn: () =>
			fetchTransactions({
				pageIndex,
				name,
				transaction_type: transaction_type === 'all' ? null : transaction_type,
				payment_method: payment_method === 'all' ? null : payment_method,
				category: category === 'all' ? null : category,
			}),
	})

	function handlePaginate(pageIndex: number) {
		params.set('page', (pageIndex + 1).toString())

		replace(`${pathname}?${params.toString()}`)
	}

	return (
		<div className="space-y-2.5">
			<TransactionTableFilters />

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
