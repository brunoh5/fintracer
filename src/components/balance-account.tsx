'use client'

import { api } from '@/lib/api'
import Cookie from 'js-cookie'
import { useState, useEffect } from 'react'
import { Button } from './ui/button'

type Account = {
  id: string
  type: string
  bank: string
  bankImgUrl?: string
  number?: string
  balance: number
}

export function BalanceAccount({ accountId }: { accountId: string }) {
  const token = Cookie.get('token')

  const [account, setAccount] = useState<Account | null>(null)

  useEffect(() => {
    api
      .get(`/accounts/${accountId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setAccount(res.data.account)
      })
  }, [token, accountId])

  return (
    <div className="flex flex-col gap-10 w-full rounded-lg bg-white px-6 py-5">
      <div className="grid grid-cols-3 gap-y-10 gap-x-28">
        <div>
          <p className="text-gray-300">Bank Name</p>
          <p className="text-lg font-bold">{account?.bank}</p>
        </div>
        <div>
          <p className="text-gray-300">Account Type</p>
          <p className="text-lg font-bold">{account?.type}</p>
        </div>
        <div>
          <p className="text-gray-300">Balance</p>
          <p className="text-lg font-bold">
            {account &&
              new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(account.balance)}
          </p>
        </div>
        <div>
          <p className="text-gray-300">Branch Name</p>
          <p className="text-lg font-bold">Park Street Branch</p>
        </div>
        <div>
          <p className="text-gray-300">Account Number</p>
          <p className="text-lg font-bold">{account?.number}</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Button size="lg">Edit Details</Button>
        <Button size="lg" background="off">
          Remove
        </Button>
      </div>
    </div>
  )
}
