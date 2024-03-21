'use client'

import { useQuery } from '@tanstack/react-query'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { z } from 'zod'

import { fetchUsersTransactions } from '@/api/fetch-users-transactions'
import { Pagination } from '@/components/pagination'
import {
	Table,
	TableBody,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'

import { TransactionTableRow } from './transaction-table-row'
import { TransactionTableSkeleton } from './transaction-table-skeleton'

export function TransactionsList() {
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
		queryKey: ['transactions', pageIndex, transaction_type],
		queryFn: () => fetchUsersTransactions({ pageIndex, transaction_type }),
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
					pageIndex={0}
					totalCount={20}
					perPage={10}
					onPageChange={handlePaginate}
				/>
			)}
		</div>
	)
}
