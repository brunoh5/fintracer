import { Header } from '@/components/ui/header'
import { Table, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import { Suspense } from 'react'
import { BalanceAccount } from './balance-account'
import { TransactionsList } from './transactions-list'

export default function Account({ params }: { params: { id: string } }) {
  return (
    <div className="flex w-screen flex-col">
      <Header />

      <main className="relative flex flex-col gap-4 pb-8 pl-6 pr-8 pt-4">
        <h2 className="text-[22px] text-gray-500">Account Details</h2>

        <BalanceAccount accountId={params.id} />

        <div className="flex items-center justify-between">
          <h2 className="mb-2 text-[22px] text-gray-500">
            Transactions History
          </h2>
          <div className="flex gap-4 justify-center items-center text-gray-500">
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

            <Suspense>
              <TransactionsList accountId={params.id} />
            </Suspense>
          </Table>
        </div>
      </main>
    </div>
  )
}
