'use client'

import { Button } from '@/components/ui/button'
import { useNewBill } from '@/features/bills/hooks/use-new-bill'

import { BillsTable } from './bills-table'

export default function Bills() {
	const { onOpen } = useNewBill()

	return (
		<main className="flex flex-col gap-4 pb-8 pr-8 pt-4">
			<div className="flex items-center justify-between">
				<h2 className="text-[22px] text-foreground">Próximas Despesas</h2>

				<Button onClick={() => onOpen()}>Nova Despesa</Button>
			</div>

			<BillsTable />
		</main>
	)
}
