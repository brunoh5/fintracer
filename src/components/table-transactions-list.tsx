'use client'

import {
  Car,
  Clapperboard,
  Home,
  LayoutDashboard,
  ShoppingBag,
  Utensils,
} from 'lucide-react'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import Cookie from 'js-cookie'
import { api } from '@/lib/api'
import { TableBody, TableCell, TableRow } from './ui/table'

type Transaction = {
  id: string
  name: string
  shopName: string
  status: 'Complete' | 'Pending'
  amount: number
  created_at: Date
  type: string
  method: string
  category: {
    name: string
  }
}

const categoryIcon = {
  Casa: <Home size={24} className="mr-4" />,
  Alimentação: <Utensils size={24} className="mr-4" />,
  Transporte: <Car size={24} className="mr-4" />,
  Entretenimento: <Clapperboard size={24} className="mr-4" />,
  Shopping: <ShoppingBag size={24} className="mr-4" />,
  Outros: <LayoutDashboard size={24} className="mr-4" />,
}

type Icon = keyof typeof categoryIcon

const paymentMethods = {
  money: 'Dinheiro',
  PIX: 'Pix',
  credit_card: 'Cartão de credito',
  debit_card: 'Cartão de debito',
  bank_check: 'Cheque Bancário',
  bank_transfer: 'Transferência Bancária',
}

type Method = keyof typeof paymentMethods

export function TableTransactionsList() {
  const token = Cookie.get('token')

  const [transactions, setTransactions] = useState<Transaction[]>([])

  useEffect(() => {
    api
      .get('/transactions', { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        setTransactions(response.data.transactions)
      })
  }, [token])

  return (
    <TableBody>
      {transactions.map((transaction: Transaction, index) => (
        <TableRow key={index}>
          <TableCell className="flex items-center text-left">
            {categoryIcon[transaction.category.name as Icon]}
            <span className="font-semibold">{transaction.name}</span>
          </TableCell>

          <TableCell>{transaction.shopName}</TableCell>

          <TableCell>
            {dayjs(transaction.created_at).format('MMM DD YYYY')}
          </TableCell>

          <TableCell>{paymentMethods[transaction.method as Method]}</TableCell>

          <TableCell className="font-semibold">
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
