'use client'

import { TableBody, TableCell, TableRow } from '@/components/ui/table'
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

export function BillList() {
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
  )
}
