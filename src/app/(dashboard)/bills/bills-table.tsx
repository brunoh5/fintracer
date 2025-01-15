'use client'

import { useContext } from 'react'

import { Pagination } from '@/components/pagination'
import {
	Table,
	TableBody,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { BillsContext } from '@/contexts/BillsContext'
import { useFetchBills } from '@/features/bills/api/use-fetch-bills'

import { formatCurrency } from '@/utils/price-formatter'
import { BillTableFilters } from './bill-table-filters'
import { BillTableRow } from './bill-table-row'

export function BillsTable() {
	const { handlePaginate } = useContext(BillsContext)

	const { data } = useFetchBills()

	return (
		<div className="space-y-2.5">
			<div className="flex items-center gap-2">
				<p>Status</p>
				<div className="flex items-center gap-2">
					<div className="size-2 rounded-full bg-rose-500" />
					<span>Não pago:</span>
					<p>{data && formatCurrency(data?.notPaidInCents)}</p>
				</div>
			</div>

			<BillTableFilters />

			<div className="rounded-md border">
				<Table>
					<TableHeader className="font-bold">
						<TableRow>
							<TableHead className="w-[80px]" />
							<TableHead className="w-[80px]">Vencimento</TableHead>
							<TableHead className="w-auto">Descrição</TableHead>
							<TableHead className="w-[112px] text-center">Status</TableHead>
							<TableHead className="w-[112px] text-center">Valor</TableHead>
							<TableHead className="w-[80px]" />
						</TableRow>
					</TableHeader>

					<TableBody>
						{data?.bills.map(bill => {
							return <BillTableRow key={bill.id} bill={bill} />
						})}
					</TableBody>
				</Table>
			</div>

			{data?.meta && (
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
