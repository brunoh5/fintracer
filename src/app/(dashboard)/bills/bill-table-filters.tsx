'use client'

import { Search, X } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { BillsContext } from '@/contexts/BillsContext'

const billFilterSchema = z.object({
	title: z.string().optional(),
})

type BillFilterSchema = z.infer<typeof billFilterSchema>

export function BillTableFilters() {
	const { handleFilter } = useContext(BillsContext)

	const searchParams = useSearchParams()
	const params = new URLSearchParams(searchParams)

	const title = params.get('title')

	const { register, handleSubmit } = useForm<BillFilterSchema>({
		defaultValues: {
			title: title ?? '',
		},
	})

	return (
		<form
			onSubmit={handleSubmit(handleFilter)}
			className="flex items-center gap-2"
		>
			<span className="text-sm font-semibold">Filtros</span>
			<Input
				{...register('title')}
				className="h-8 w-[192px]"
				placeholder="Nome da compra"
			/>
			<Button type="submit" variant="secondary" size="xs">
				<Search className="mr-2 size-4" />
				Filtrar resultados
			</Button>
			<Button type="button" variant="outline" size="xs" disabled={true}>
				<X className="mr-2 size-4" />
				Remover filtros
			</Button>
		</form>
	)
}
