'use client'

import { Header } from '@/components/ui/header'
import { Sidebar } from '@/components/ui/sidebar'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import dayjs from 'dayjs'
import { useEffect, useState } from 'react'

type Bill = {
  dueDate: string
  logoUrl: string
  title: string
  description: string
  lastCharge: string
  amount: number
}

export default function Bills() {
  const [bills, setBills] = useState<Bill[]>([])

  useEffect(() => {
    setBills([
      {
        dueDate: '07-17-2023',
        logoUrl: '/figma.svg',
        title: 'Figma - Yearly Plan',
        description:
          'For advanced security and more flexible controls, the Professional plan helps you scale design processes company-wide.',
        lastCharge: '07-18-2022',
        amount: 150,
      },
    ])
  }, [])

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex w-screen flex-col">
        <Header />

        <main className="flex flex-col gap-4 pb-8 pl-6 pr-8 pt-4">
          <h2 className="text-[22px] text-gray-500">Upcoming Bills</h2>

          <div className="rounded-2xl bg-white px-7">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Invoice</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bills.map((bill, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">INV001</TableCell>
                    <TableCell>Paid</TableCell>
                    <TableCell>Credit Card</TableCell>
                    <TableCell className="text-right">$250.00</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="rounded-2xl bg-white px-7">
            <Table className="w-full text-center">
              <TableHeader className="border-b border-[#D2D2D2]/25 font-bold">
                <TableRow>
                  <TableHead scope="col" className="py-3 text-center">
                    Due Date
                  </TableHead>
                  {/* <TableHead scope="col" className="px-10 py-3 text-left">
                    Logo
                  </TableHead> */}
                  <TableHead scope="col" className="py-3 text-left">
                    Item Description
                  </TableHead>
                  <TableHead scope="col" className="px-7 py-3">
                    Last Charge
                  </TableHead>
                  <TableHead scope="col" className="py-3">
                    Amount
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody className="divide-y">
                {bills.map((bill, index) => (
                  <TableRow key={index}>
                    <TableCell
                      scope="row"
                      className="max-w-[72px] text-gray-700 flex flex-col items-center rounded-lg bg-[#D2D2D2]/25 px-2 py-3 text-center"
                    >
                      <span>{dayjs(bill.dueDate).format('MMM')}</span>
                      <span className="text-[22px] font-extrabold">
                        {dayjs(bill.dueDate).format('DD')}
                      </span>
                    </TableCell>
                    <TableCell
                      scope="row"
                      className="flex-start flex w-[304px] flex-col py-8 text-left"
                    >
                      <span className="font-extrabold">{bill.title}</span>
                      <p className="text-justify text-sm text-gray-300">
                        {bill.description}
                      </p>
                    </TableCell>
                    <TableCell className="px-7 py-8 text-gray-700">
                      {dayjs(bill.lastCharge).format('DD MMM, YYYY')}
                    </TableCell>
                    <TableCell className="py-8 font-extrabold text-eerie-black-900">
                      {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      }).format(bill.amount)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </main>
      </div>
    </div>
  )
}
