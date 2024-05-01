'use client'

import { useQuery } from '@tanstack/react-query'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { z } from 'zod'

import { fetchTransactions } from '@/api/fetch-transactions'
import { Pagination } from '@/components/pagination'
import { TransactionTableFilters } from '@/components/transaction-table-filters'
import { TransactionTableRow } from '@/components/transaction-table-row'
import { TransactionTableSkeleton } from '@/components/transaction-table-skeleton'
import { TransactionsStatus } from '@/components/transactions-status'
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
			accountId,
			pageIndex,
			name,
			transaction_type,
			payment_method,
			category,
		],
		queryFn: () =>
			fetchTransactions({
				accountId,
				pageIndex,
				name,
				transaction_type: transaction_type === 'all' ? null : transaction_type,
				payment_method: payment_method === 'all' ? null : payment_method,
				category: category === 'all' ? null : category,
			}),
	})

	function handlePaginate(pageIndex: number) {
		const params = new URLSearchParams(searchParams)

		params.set('page', (pageIndex + 1).toString())

		replace(`${pathname}?${params.toString()}`)
	}

	return (
		<div className="space-y-2.5">
			<TransactionsStatus
				totalExpenseInCents={result?.transactionsStatus.totalExpenseInCents}
				totalRevenueInCents={result?.transactionsStatus.totalRevenueInCents}
			/>
			<TransactionTableFilters />

			<div className="rounded-md border">
				<Table>
					<TableHeader className="font-bold">
						<TableRow>
							<TableHead className="w-[40px]"></TableHead>
							<TableHead>Nome</TableHead>
							<TableHead className="w-[140px] text-center">
								Estabelecimento
							</TableHead>
							<TableHead className="w-[140px] text-center">Data</TableHead>
							<TableHead className="w-[140px] text-center">Pagamento</TableHead>
							<TableHead className="w-[140px] text-center">Valor</TableHead>
							<TableHead className="w-[40px]"></TableHead>
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
