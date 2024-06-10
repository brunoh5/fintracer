'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { TransactionsTable } from '@/components/transactions-table'
import { useFetchTransactions } from '@/features/transactions/api/use-fetch-transactions'

interface TransactionsListProps {
	accountId: string
}

export function TransactionsList({ accountId }: TransactionsListProps) {
	const { data, isLoading } = useFetchTransactions({ accountId })
	const searchParams = useSearchParams()
	const { replace } = useRouter()
	const pathname = usePathname()

	function handlePaginate(pageIndex: number) {
		const params = new URLSearchParams(searchParams)

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
