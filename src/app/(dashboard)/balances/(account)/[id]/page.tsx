import { Plus } from 'lucide-react'
import Link from 'next/link'
import { Suspense } from 'react'

import { Header } from '@/components/header'
import { Table, TableHead, TableHeader, TableRow } from '@/components/ui/table'

import { BalanceAccount } from './balance-account'
import { TransactionsList } from './transactions-list'

export default function Account({ params }: { params: { id: string } }) {
	return (
		<div className="ml-[280px] flex w-screen flex-col">
			<Header />

			<main className="relative flex flex-col gap-4 pb-8 pl-6 pr-8 pt-4">
				<h2 className="text-[22px] text-gray-500">Detalhes da Conta</h2>

				<Suspense>
					<BalanceAccount accountId={params.id} />
				</Suspense>

				<div className="flex items-center justify-between">
					<h2 className="mb-2 text-[22px] text-gray-500">
						Histórico de Transações
					</h2>
					<div className="flex items-center justify-center gap-4 text-gray-500">
						<Plus size={16} />
						<Link
							className="text-xs"
							href={`/balances/${params.id}/new-transaction`}
						>
							Crie uma nova Transação
						</Link>
					</div>
				</div>

				<div className="w-full bg-white px-6 py-5">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="text-left font-bold">
									Data da Transação
								</TableHead>
								<TableHead className="text-center font-bold">Status</TableHead>
								<TableHead className="text-center font-bold">
									Tipo da Transação
								</TableHead>
								<TableHead className="text-center font-bold">
									Método de pagamento
								</TableHead>
								<TableHead className="text-center font-bold">Valor</TableHead>
							</TableRow>
						</TableHeader>

						<Suspense fallback={<p>Carregando</p>}>
							<TransactionsList accountId={params.id} />
						</Suspense>
					</Table>
				</div>
			</main>
		</div>
	)
}
