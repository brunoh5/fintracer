'use client'

import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'

import mastercardIcon from '@/assets/Mastercard-Logo 1.png'
import { formatPrice } from '@/lib/formatPrice'
import { useState } from 'react'
import { Pagination } from './ui/pagination'

type Account = {
  type: string
  number: string
  balance: number
}

interface TotalBalanceAccountListProps {
  accounts: Account[]
}

export function TotalBalanceAccountList({
  accounts,
}: TotalBalanceAccountListProps) {
  const [totalPage] = useState(accounts.length)
  const [currentIndex, setCurrentIndex] = useState(0)

  return (
    <>
      <div className="overflow-hidden">
        {accounts.length !== 0 ? (
          accounts.map((account, index) => (
            <div
              key={index}
              data-index={currentIndex === index}
              className="items-center justify-between rounded bg-persian-green p-4 hidden data-[index=true]:flex"
            >
              {/* Account */}
              <div className="flex flex-col">
                <span className="text-white/70">Account Type</span>
                <p className="text-white">{account.type}</p>
                <span className="text-white/70">{account.number}</span>
              </div>
              <div className="flex flex-col justify-between">
                <Image
                  src={mastercardIcon}
                  alt="Mastercard"
                  className="self-end"
                />
                <div className="self flex items-center justify-between">
                  <span className="text-white">
                    {formatPrice(account.balance)}
                  </span>
                  <ArrowUpRight
                    size={16}
                    className="rounded-full bg-white text-persian-green"
                  />
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex justify-center items-center rounded bg-persian-green p-4 text-zinc-50 h-full">
            <p>Nenhuma conta criada ainda</p>
          </div>
        )}
      </div>

      <div className="mt-2 flex items-center justify-between">
        {/* <button
          onClick={() => {
            if (currentIndex === 0) return
            setCurrentIndex(currentIndex - 1)
          }}
          className="flex items-center justify-center text-[#D1D1D1]"
          aria-label="previous account view"
        >
          <ChevronLeft size={16} />
          Previous
        </button> */}
        {/* <span>...</span> */}
        <Pagination />
        {/* <button
          onClick={() => {
            if (currentIndex + 1 === totalPage) return
            setCurrentIndex(currentIndex + 1)
          }}
          className="flex items-center justify-center"
          aria-label="next account view"
        >
          Next
          <ChevronRight size={16} className="text-eerie-black-900" />
        </button> */}
      </div>
    </>
  )
}
