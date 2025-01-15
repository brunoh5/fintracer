/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { type ReactNode, createContext } from 'react'

export type Bill = {
	id: string
	dueDate: string
	logoUrl: string
	title: string
	description: string
	lastCharge: string
	amountInCents: number
	userId: string
	paid_at: string
}

interface FilterBillData {
	title?: string | null
	status?: string | null
}

interface BillsContextType {
	bills?: Bill[]
	billsStatus?: {
		notPaidInCents: number
	}
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

	function handlePaginate(pageIndex: number) {
		params.set('page', (pageIndex + 1).toString())

		replace(`${pathname}?${params.toString()}`)
	}

	function handleFilter({ title, status }: FilterBillData) {
		if (title) {
			params.set('title', title)
		} else {
			params.delete('title')
		}

		if (status) {
			params.set('status', status)
		} else {
			params.delete('status')
		}

		params.set('page', '1')

		replace(`${pathname}?${params.toString()}`)
	}

	return (
		<BillsContext.Provider
			value={{
				handlePaginate,
				handleFilter,
			}}
		>
			{children}
		</BillsContext.Provider>
	)
}
