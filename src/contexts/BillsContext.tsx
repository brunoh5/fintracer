/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import { createContext, ReactNode } from 'react'
import { z } from 'zod'

import { getBill } from '@/api/get-bill'

interface BillsContextType {
	bills: any[] | undefined
}

export const BillsContext = createContext({} as BillsContextType)

interface BillsContextProviderProps {
	children: ReactNode
}

export function BillsContextProvider({ children }: BillsContextProviderProps) {
	const searchParams = useSearchParams()
	const params = new URLSearchParams(searchParams)

	const title = ''

	const pageIndex = z.coerce
		.number()
		.transform((page) => page - 1)
		.parse(params.get('page') ?? '1')

	const { data: result } = useQuery({
		queryKey: ['bills', pageIndex, title],
		queryFn: () => getBill({ pageIndex: 0, title }),
	})

	return (
		<BillsContext.Provider value={{ bills: result?.bills }}>
			{children}
		</BillsContext.Provider>
	)
}
