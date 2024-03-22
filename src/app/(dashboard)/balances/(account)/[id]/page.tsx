import { NewTransaction } from '@/components/new-transaction-form'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'

import { ManageAccount } from './manage-account'
import { TransactionsList } from './transactions-list'

export default function Account({ params }: { params: { id: string } }) {
	return (
		<main className="relative flex flex-col gap-4 pb-8 pl-6 pr-8 pt-4">
			<Card>
				<CardHeader className="flex">
					<CardTitle className="text-xl">Detalhes da conta</CardTitle>
				</CardHeader>
				<ManageAccount accountId={params.id} />
			</Card>

			<div className="flex items-center justify-between">
				<h2 className="mb-2 text-[22px] text-gray-500">
					Histórico de Transações
				</h2>

				<NewTransaction accountId={params.id} />
			</div>

			<TransactionsList accountId={params.id} />
		</main>
	)
}
