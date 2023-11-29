'use client'

import dayJs from 'dayjs'
import Cookie from 'js-cookie'

import { TableBody, TableCell, TableRow } from '@/components/ui/table'
import { api } from '@/lib/api'
import { useEffect, useState } from 'react'

type Transactions = {
  id: string
  category: string
  name: string
  status: 'Complete' | 'Pending'
  amount: number
  created_at: Date
  type: string
  payment_method: string
}

const transactionType = {
  sent: 'Enviada',
  received: 'Recebida',
}

const paymentMethods = {
  money: 'Dinheiro',
  PIX: 'Pix',
  credit_card: 'Cartão de credito',
  debit_card: 'Cartão de debito',
  bank_check: 'Cheque Bancário',
  bank_transfer: 'Transferência Bancária',
}

type Type = keyof typeof transactionType
type Method = keyof typeof paymentMethods

export function TransactionsList({ accountId }: { accountId: string }) {
  const token = Cookie.get('token')

  const [transactions, setTransactions] = useState<Transactions[]>([])

  useEffect(() => {
    api
      .get(`/transactions/${accountId}/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setTransactions(res.data.transactions)
      })
  }, [token, accountId])

  return (
    <TableBody>
      {transactions.map((transaction) => (
        <TableRow key={transaction.id}>
          <TableCell className="text-left">
            {dayJs(transaction.created_at).format('MMM DD YYYY')}
          </TableCell>
          <TableCell className="text-center">
            {transaction.status}Pending
          </TableCell>
          <TableCell className="text-center">
            {transactionType[transaction.type as Type]}
          </TableCell>
          <TableCell className="text-center">
            {paymentMethods[transaction.payment_method as Method]}
          </TableCell>
          <TableCell className="text-center font-bold">
            {new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format(transaction.amount)}
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  )
}
