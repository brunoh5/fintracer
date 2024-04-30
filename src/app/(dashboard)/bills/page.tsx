import { NewBillForm } from '@/components/new-bill-form'

import { BillsTable } from './bills-table'

export default function Bills() {
	return (
		<main className="flex flex-col gap-4 pb-8 pl-6 pr-8 pt-4">
			<div className="flex items-center justify-between">
				<h2 className="text-[22px] text-foreground">Próximas Contas</h2>

				<NewBillForm />
			</div>

			<BillsTable />
		</main>
	)
}
