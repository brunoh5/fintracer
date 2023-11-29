import { TableTransactions } from '@/components/table-transactions'
import { Button } from '@/components/ui/button'
import { Header } from '@/components/ui/header'

export default function Transactions() {
  return (
    <div className="flex w-screen flex-col">
      <Header />

      <main className="flex flex-col gap-4 pb-8 pl-6 pr-8 pt-4">
        <h2 className="text-[22px] text-gray-500">Recent Transactions</h2>

        <div className="flex w-[300px] items-center justify-between font-bold text-gray-900">
          <span className="border-b-2 border-persian-green p-2 text-persian-green">
            All
          </span>
          <span className="p-2">Revenue</span>
          <span className="p-2">Expenses</span>
        </div>

        <div className="rounded-2xl bg-white px-7">
          <TableTransactions />

          <div className="mt-8 mb-8 flex items-center justify-center">
            <Button className="w-48">Load More</Button>
          </div>
        </div>
      </main>
    </div>
  )
}
