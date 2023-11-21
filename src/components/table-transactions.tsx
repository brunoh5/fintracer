import { TableTransactionsList } from './table-transactions-list'
import { Table, TableHead, TableHeader, TableRow } from './ui/table'

export function TableTransactions() {
  return (
    <Table className="w-full text-center">
      <TableHeader className="border-b border-[#D2D2D2]/25 font-bold">
        <TableRow>
          <TableHead scope="col" className="py-3 text-left">
            Items
          </TableHead>
          <TableHead scope="col" className="px-7 py-3 text-center">
            Shop Name
          </TableHead>
          <TableHead scope="col" className="px-7 py-3 text-center">
            Date
          </TableHead>
          <TableHead scope="col" className="px-7 py-3 text-center">
            Payment Method
          </TableHead>
          <TableHead scope="col" className="py-3 text-center">
            Amount
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableTransactionsList />
    </Table>
  )
}
