import { Button } from '@/components/ui/button'
import { Header } from '@/components/header'
import { Table, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { TransactionList } from './transaction-list'

export default function Transactions() {
	return (
		<div className="flex-1 w-screen flex-col ml-[280px]">
			<Header />

			<main className="flex flex-col gap-4 pb-8 pl-6 pr-8 pt-4">
				<h2 className="text-[22px] text-gray-500">Transações Recentes</h2>

				<div className="flex w-[300px] items-center justify-between font-bold text-gray-900">
					<span className="border-b-2 border-persian-green p-2 text-persian-green">
						Todos
					</span>
					<span className="p-2">Receita</span>
					<span className="p-2">Despesas</span>
				</div>

				<div className="rounded-2xl bg-white px-7">
					<Table className="w-full text-center">
						<TableHeader className="border-b border-[#D2D2D2]/25 font-bold">
							<TableRow>
								<TableHead scope="col" className="py-3 text-left">
									Nome
								</TableHead>
								<TableHead scope="col" className="px-7 py-3 text-center">
									Estabelecimento
								</TableHead>
								<TableHead scope="col" className="px-7 py-3 text-center">
									Data
								</TableHead>
								<TableHead scope="col" className="px-7 py-3 text-center">
									Método de Pagamento
								</TableHead>
								<TableHead scope="col" className="py-3 text-center">
									Valor
								</TableHead>
							</TableRow>
						</TableHeader>

						<TransactionList />
					</Table>

					<div className="mt-8 mb-8 flex items-center justify-center">
						<Button className="w-48">Load More</Button>
					</div>
				</div>
			</main>
		</div>
	)
}
