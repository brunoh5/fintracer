'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { TransactionsTable } from '@/components/transactions-table'
import { useFetchTransactions } from '@/features/transactions/api/use-fetch-transactions'

export function TransactionsList() {
	const searchParams = useSearchParams()
	const params = new URLSearchParams(searchParams)
	const { replace } = useRouter()
	const pathname = usePathname()

	const { data, isLoading } = useFetchTransactions({})

	function handlePaginate(pageIndex: number) {
		params.set('page', (pageIndex + 1).toString())

		replace(`${pathname}?${params.toString()}`)
	}

	return (
		<TransactionsTable
			data={data}
			handlePaginate={handlePaginate}
			isLoadingTransactions={isLoading}
		/>
	)
}
