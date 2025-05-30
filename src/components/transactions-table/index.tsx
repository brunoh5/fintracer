'use client'

import { ListX } from 'lucide-react'

import type { Transaction } from '@features/transactions/@types/Transaction'
import { TransactionsActions } from '@features/transactions/components/transactions-actions'
import { Pagination } from '../pagination'
import { Table, TableBody, TableHead, TableHeader, TableRow } from '../ui/table'
import { TransactionTableFilters } from './filters'
import { TransactionTableRow } from './row'
import { TransactionsStatus } from './status'
import { TransactionTableSkeleton } from './table-skeleton'

interface TransactionsTableProps {
	data?: {
		transactions: Transaction[]
		totalExpenseInCents: number
		totalRevenueInCents: number
		meta: {
			pageIndex: number
			perPage: number
			totalCount: number
		}
	}
	handlePaginate: (pageIndex: number) => void
	isLoadingTransactions: boolean
}

export function TransactionsTable({
	data,
	handlePaginate,
	isLoadingTransactions,
}: TransactionsTableProps) {
	const isEmpty = !data?.transactions?.length

	return (
		<div className="space-y-2.5">
			<div className="flex items-center justify-between">
				<TransactionTableFilters />
				<TransactionsActions />
			</div>

			<TransactionsStatus
				isLoading={isLoadingTransactions}
				isEmpty={isEmpty}
				totalExpenseInCents={data?.totalExpenseInCents}
				totalRevenueInCents={data?.totalRevenueInCents}
			/>

			{isEmpty ? (
				<div className="relative h-[calc(100vh-200px)] overflow-hidden">
					<div className="mx-auto flex flex-col items-center justify-center space-y-4">
						<ListX className="size-10" />
						<p className="text-lg font-bold">Sem resultados</p>
					</div>
				</div>
			) : (
				<Table>
					<TableHeader className="font-bold">
						<TableRow>
							<TableHead className="w-[128px] border text-center">
								Data
							</TableHead>
							<TableHead className="border">Descrição</TableHead>
							<TableHead className="w-[144px] border text-center">
								Valor
							</TableHead>
							<TableHead className="w-[144px] border text-center">
								Conta
							</TableHead>
							<TableHead className="w-[144px] border text-center">
								Categoria
							</TableHead>
							<TableHead className="w-[144px] border text-center">
								Método
							</TableHead>
							<TableHead className="w-[96px] border text-center">
								Ações
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{isLoadingTransactions && <TransactionTableSkeleton />}

						{data.transactions.map(transaction => {
							return (
								<TransactionTableRow
									key={transaction.id}
									transaction={transaction}
								/>
							)
						})}
					</TableBody>
				</Table>
			)}

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
