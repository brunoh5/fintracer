import { Header } from '@/components/header'
import { Table, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Suspense } from 'react'
import { BillList } from './bill-list'

export default function Bills() {
	return (
		<div className="flex-1 w-screen flex-col ml-[280px]">
			<Header />

			<main className="flex flex-col gap-4 pb-8 pl-6 pr-8 pt-4">
				<h2 className="text-[22px] text-gray-500">Próximas Contas</h2>

				{/* <div className="rounded-2xl bg-white px-7">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Invoice</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Method</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bills.map((bill, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">INV001</TableCell>
                  <TableCell>Paid</TableCell>
                  <TableCell>Credit Card</TableCell>
                  <TableCell className="text-right">$250.00</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div> */}

				<div className="rounded-2xl bg-white px-7">
					<Table className="w-full text-center">
						<TableHeader className="border-b border-[#D2D2D2]/25 font-bold">
							<TableRow>
								<TableHead scope="col" className="py-3 text-center">
									Vencimento
								</TableHead>
								{/* <TableHead scope="col" className="px-10 py-3 text-left">
                    Logo
                  </TableHead> */}
								<TableHead scope="col" className="py-3 text-left">
									Descrição
								</TableHead>
								<TableHead scope="col" className="px-7 py-3">
									Ultima Cobrança
								</TableHead>
								<TableHead scope="col" className="py-3">
									Valor
								</TableHead>
							</TableRow>
						</TableHeader>

						<Suspense>
							<BillList />
						</Suspense>
					</Table>
				</div>
			</main>
		</div>
	)
}
