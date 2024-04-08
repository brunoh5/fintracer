'use client'

import { useQuery } from '@tanstack/react-query'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useContext } from 'react'
import { z } from 'zod'

import { getBill } from '@/api/get-bill'
import { Pagination } from '@/components/pagination'
import {
	Table,
	TableBody,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { BillsContext } from '@/contexts/BillsContext'

import { BillTableRow } from './bill-table-row'

export function BillsTable() {
	const { bills } = useContext(BillsContext)

	console.log(bills)

	const searchParams = useSearchParams()
	const { replace } = useRouter()
	const pathname = usePathname()
	const params = new URLSearchParams(searchParams)

	const title = params.get('title')

	const pageIndex = z.coerce
		.number()
		.transform((page) => page - 1)
		.parse(params.get('page') ?? '1')

	const { data: result } = useQuery({
		queryKey: ['bills', pageIndex, title],
		queryFn: () =>
			getBill({
				pageIndex,
				title,
			}),
	})

	function handlePaginate(pageIndex: number) {
		params.set('page', (pageIndex + 1).toString())

		replace(`${pathname}?${params.toString()}`)
	}

	return (
		<div className="space-y-2.5">
			<div className="rounded-md border">
				<Table>
					<TableHeader className="font-bold">
						<TableRow>
							<TableHead>Vencimento</TableHead>
							<TableHead>Descrição</TableHead>
							<TableHead>Ultima Cobrança</TableHead>
							<TableHead>Valor</TableHead>
						</TableRow>
					</TableHeader>

					<TableBody>
						{result &&
							result.bills.map((bill) => {
								return <BillTableRow key={bill.id} bill={bill} />
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
