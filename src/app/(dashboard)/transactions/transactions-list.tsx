'use client'

import { useQuery } from '@tanstack/react-query'

import { fetchUsersTransactions } from '@/api/fetch-users-transactions'
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
	const { data: transactions, isLoading: isLoadingTransactions } = useQuery({
		queryKey: ['users', 'transactions'],
		queryFn: () => fetchUsersTransactions({ query: undefined }),
	})

	return (
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

				{transactions &&
					transactions.map((transaction) => {
						return (
							<TransactionTableRow
								key={transaction.id}
								transaction={transaction}
							/>
						)
					})}
			</TableBody>
		</Table>
	)
}
