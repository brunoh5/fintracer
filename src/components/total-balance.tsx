'use client'

import Link from 'next/link'
import Cookies from 'js-cookie'

import { TotalBalanceAccountList } from './total-balance-account-list'
import { api } from '@/lib/api'
import { useState, useEffect } from 'react'
import { formatPrice } from '@/lib/formatPrice'

type Account = {
  type: string
  number: string
  balance: number
}

export function TotalBalance() {
  const token = Cookies.get('token')

  const [accounts, setAccounts] = useState<Account[]>([])
  const [totalBalance, setTotalBalance] = useState(0)

  useEffect(() => {
    api
      .get('/accounts', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const { accounts } = res.data
        const totalBalance = accounts.reduce(
          (acc: number, account: Account) => {
            return (acc += account.balance)
          },
          0,
        )

        setAccounts(accounts)
        setTotalBalance(totalBalance)
      })
  }, [token])

  return (
    <div className="w-full">
      <h2 className="mb-2 text-[22px] text-gray-500">Total Balance</h2>
      <div className="flex h-[232px] w-full flex-col gap-3 rounded-lg bg-white px-6 py-5">
        <div className="flex items-center justify-between border-b border-[#F3F3F3] pb-3">
          <span className="text-[22px] font-bold text-eerie-black-900">
            {formatPrice(totalBalance)}
          </span>
          <Link href="/balances" className="text-xs text-gray-900">
            All Accounts
          </Link>
        </div>

        <TotalBalanceAccountList accounts={accounts} />
      </div>
    </div>
  )
}
