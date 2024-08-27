/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { Pagination } from '../pagination'
import { Table, TableBody, TableHead, TableHeader, TableRow } from '../ui/table'
import { TransactionTableFilters } from './filters'
import { TransactionTableRow } from './row'
import { TransactionsStatus } from './status'
import { TransactionTableSkeleton } from './table-skeleton'

interface TransactionsTableProps {
	data: any
	handlePaginate: (pageIndex: number) => void
	isLoadingTransactions: boolean
}

export function TransactionsTable({
	data,
	handlePaginate,
	isLoadingTransactions,
}: TransactionsTableProps) {
	return (
		<div className="space-y-2.5">
			<TransactionsStatus
				totalExpenseInCents={data?.transactionsStatus.totalExpenseInCents}
				totalRevenueInCents={data?.transactionsStatus.totalRevenueInCents}
			/>

			<TransactionTableFilters />

			<div className="rounded-md border">
				<Table>
					<TableHeader className="font-bold">
						<TableRow>
							<TableHead className="w-[140px] text-center">Data</TableHead>
							<TableHead>Descrição</TableHead>
							<TableHead className="w-[140px] text-center">Valor</TableHead>
							<TableHead className="w-[140px] text-center">Categoria</TableHead>
							<TableHead className="text-center">Método</TableHead>
							<TableHead className="w-[80px]"></TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{isLoadingTransactions && <TransactionTableSkeleton />}

						{data &&
							data.transactions.map((transaction: any) => {
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

			{data && (
				<Pagination
					pageIndex={data.meta.pageIndex}
					totalCount={data.meta.totalCount}
					perPage={data.meta.perPage}
					onPageChange={handlePaginate}
				/>
			)}
		</div>
	)
}
