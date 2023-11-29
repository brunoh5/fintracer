'use client'

import { Navigation } from '@/components/ui/Navigation'
import { api } from '@/lib/api'
import Cookies from 'js-cookie'
import { ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'

type Account = {
  id: string
  type: string
  bank: string
  bankImgUrl?: string
  number?: string
  balance: number
}

export function AccountList() {
  const token = Cookies.get('token')

  const [accounts, setAccounts] = useState<Account[]>([])

  useEffect(() => {
    api
      .get('/accounts', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setAccounts(res.data.accounts)
      })
  }, [token])

  return (
    <>
      {accounts &&
        accounts.map((account) => {
          return (
            <div key={account.id} className="rounded-lg bg-white p-6 h-72">
              <div className="flex items-center justify-between pb-3 border-b border-[#D2D2D2]/25">
                <p className="font-bold text-gray-500">{account.type}</p>
                <div className="flex items-center gap-1">
                  <span className="text-gray-700 font-medium text-xs">
                    {account.bank}
                  </span>
                  {account.bankImgUrl && (
                    <Image
                      src={account.bankImgUrl}
                      width={44}
                      height={24}
                      alt={account.bank}
                    />
                  )}
                </div>
              </div>
              <div className="flex w-full flex-col gap-6 mt-4">
                <div className="flex flex-col gap-4">
                  <div>
                    <p className="text-xl font-bold">{account.number}</p>
                    <span className="text-gray-300 text-xs">
                      Account Number
                    </span>
                  </div>
                  <div>
                    <p className="text-xl font-bold">${account.balance}</p>
                    <span className="text-gray-300 text-xs">Total amount</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <button className="text-primary">Remove</button>

                  <Navigation.Root href={`/balances/${account.id}`}>
                    Details
                    <ChevronRight size={16} className="text-white" />
                  </Navigation.Root>
                </div>
              </div>
            </div>
          )
        })}
    </>
  )
}
