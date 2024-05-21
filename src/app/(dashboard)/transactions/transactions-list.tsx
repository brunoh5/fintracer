'use client'

import { useQuery } from '@tanstack/react-query'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { z } from 'zod'

import { fetchTransactions } from '@/api/fetch-transactions'
import { TransactionsTable } from '@/components/transactions-table'

export function TransactionsList() {
	const searchParams = useSearchParams()
	const params = new URLSearchParams(searchParams)
	const { replace } = useRouter()
	const pathname = usePathname()

	const from = params.get('from')
	const to = params.get('to')
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
			from,
			to,
			name,
			transaction_type,
			payment_method,
			category,
		],
		queryFn: () =>
			fetchTransactions({
				pageIndex,
				from,
				to,
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
		<TransactionsTable
			data={result}
			handlePaginate={handlePaginate}
			isLoadingTransactions={isLoadingTransactions}
		/>
	)
}
