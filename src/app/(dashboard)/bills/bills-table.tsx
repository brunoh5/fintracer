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

import { BillTableFilters } from './bill-table-filters'
import { BillTableRow } from './bill-table-row'

export function BillsTable() {
	const { bills, handlePaginate, meta, billsStatus } = useContext(BillsContext)

	return (
		<div className="space-y-2.5">
			<div className="flex items-center gap-2">
				<p>Status</p>
				<div className="flex items-center gap-2">
					<div className="size-2 rounded-full bg-rose-500" />
					<span>Não pago:</span>
					<p>
						{billsStatus &&
							(billsStatus?.notPaidInCents / 100).toLocaleString('pt-BR', {
								style: 'currency',
								currency: 'BRL',
							})}
					</p>
				</div>
			</div>

			<BillTableFilters />

			<div className="rounded-md border">
				<Table>
					<TableHeader className="font-bold">
						<TableRow>
							<TableHead className="w-[80px]"></TableHead>
							<TableHead className="w-[80px]">Vencimento</TableHead>
							<TableHead className="w-auto">Descrição</TableHead>
							<TableHead className="w-[112px] text-center">Status</TableHead>
							<TableHead className="w-[112px] text-center">Valor</TableHead>
							<TableHead className="w-[80px]"></TableHead>
						</TableRow>
					</TableHeader>

					<TableBody>
						{bills &&
							bills.map((bill) => {
								return <BillTableRow key={bill.id} bill={bill} />
							})}
					</TableBody>
				</Table>
			</div>

			{meta && (
				<Pagination
					pageIndex={meta.pageIndex}
					totalCount={meta.totalCount}
					perPage={meta.perPage}
					onPageChange={handlePaginate}
				/>
			)}
		</div>
	)
}
