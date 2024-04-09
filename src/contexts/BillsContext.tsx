/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useQuery } from '@tanstack/react-query'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { createContext, ReactNode } from 'react'
import { z } from 'zod'

import { getBill } from '@/api/get-bill'

type Bill = {
	id: string
	dueDate: string
	logoUrl: string
	title: string
	description: string
	lastCharge: string
	amountInCents: number
	userId: string
}

interface FilterBillData {
	title?: string
}

interface BillsContextType {
	bills?: Bill[]
	meta?: {
		perPage: number
		totalCount: number
		pageIndex: number
	}
	handlePaginate: (pageIndex: number) => void
	handleFilter: (filter: FilterBillData) => void
}

export const BillsContext = createContext({} as BillsContextType)

interface BillsContextProviderProps {
	children: ReactNode
}

export function BillsContextProvider({ children }: BillsContextProviderProps) {
	const searchParams = useSearchParams()
	const params = new URLSearchParams(searchParams)
	const { replace } = useRouter()
	const pathname = usePathname()

	const title = params.get('title')

	const pageIndex = z.coerce
		.number()
		.transform((page) => page - 1)
		.parse(params.get('page') ?? '1')

	const { data: result } = useQuery({
		queryKey: ['bills', pageIndex, title],
		queryFn: () =>
			getBill({
				pageIndex,
				title,
			}),
	})

	function handlePaginate(pageIndex: number) {
		params.set('page', (pageIndex + 1).toString())

		replace(`${pathname}?${params.toString()}`)
	}

	function handleFilter({ title }: FilterBillData) {
		if (title) {
			params.set('title', title)
		} else {
			params.delete('title')
		}

		params.set('page', '1')

		replace(`${pathname}?${params.toString()}`)
	}

	return (
		<BillsContext.Provider
			value={{
				bills: result?.bills,
				handlePaginate,
				meta: result?.meta,
				handleFilter,
			}}
		>
			{children}
		</BillsContext.Provider>
	)
}
