'use client'

import { useQuery } from '@tanstack/react-query'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { z } from 'zod'

import { fetchTransactions } from '@/api/fetch-transactions'
import { TransactionsTable } from '@/components/transactions-table'

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
		<TransactionsTable
			data={result}
			handlePaginate={handlePaginate}
			isLoadingTransactions={isLoadingTransactions}
		/>
	)
}
