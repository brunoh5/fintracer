'use client'

import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'

import { api } from '@/lib/api'

type Transaction = {
  id: string
  category: string
  name: string
  shopName: string
  amount: number
  date: Date
}

export function RecentTransactionsList() {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  useEffect(() => {
    const token = Cookies.get('token')

    api
      .get('/transactions', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res.data.transactions)
        setTransactions([...res.data.transactions])
      })
  }, [])

  return (
    <p>Resolvendo</p>
    // <div className="flex flex-1 flex-col divide-y divide-[#F3F3F3] pb-2">
    //   {transactions.map((transaction, index) => (
    //     <div
    //       key={index}
    //       className="flex items-center justify-between gap-7 py-6"
    //     >
    //       <div className="flex items-center gap-4">
    //         <div className="p-2">
    //           {transaction.category === 'food' && <Utensils />}
    //           {transaction.category === 'transportation' && <Car />}
    //           {transaction.category === 'entertainment' && <Clapperboard />}
    //           {transaction.category === 'shopping' && <ShoppingBag />}
    //           {transaction.category === 'Others' && <LayoutDashboard />}
    //           {transaction.category === 'Others' && <LayoutDashboard />}
    //         </div>
    //         <div className="flex flex-col">
    //           <p className="font-semibold">{transaction.name}</p>
    //           <span className="text-xs text-gray-300">
    //             {transaction.shopName}
    //           </span>
    //         </div>
    //       </div>
    //       <div className="flex flex-col items-end">
    //         <span className="font-semibold text-gray-900">
    //           {new Intl.NumberFormat('pt-BR', {
    //             style: 'currency',
    //             currency: 'BRL',
    //           }).format(transaction.amount)}
    //         </span>
    //         <span className="text-xs text-gray-300">
    //           {dayJs(transaction.date).format('MMM DD YYYY')}
    //         </span>
    //       </div>
    //     </div>
    //   ))}
    // </div>
  )
}
