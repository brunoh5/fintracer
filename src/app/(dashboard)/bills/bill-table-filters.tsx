'use client'

import { Search, X } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useContext } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { BillsContext } from '@/contexts/BillsContext'

const billFilterSchema = z.object({
	title: z.string().optional(),
	status: z.string().optional(),
})

type BillFilterSchema = z.infer<typeof billFilterSchema>

export function BillTableFilters() {
	const { handleFilter } = useContext(BillsContext)

	const searchParams = useSearchParams()
	const params = new URLSearchParams(searchParams)
	const { replace } = useRouter()
	const pathname = usePathname()

	const title = params.get('title')
	const status = params.get('status')

	const { register, handleSubmit, control, reset } = useForm<BillFilterSchema>({
		defaultValues: {
			title: title ?? '',
			status: status ?? 'all',
		},
	})

	function handleClearFilters() {
		params.delete('title')
		params.delete('status')
		params.set('page', '1')
		replace(`${pathname}?${params.toString()}`)

		reset({
			title: '',
			status: 'all',
		})
	}

	return (
		<form
			onSubmit={handleSubmit(handleFilter)}
			className="grid grid-cols-2 gap-2 lg:flex lg:items-center"
		>
			<span className="text-sm font-semibold">Filtros</span>
			<Input
				{...register('title')}
				className="h-8 w-[192px]"
				placeholder="Nome da compra"
			/>
			<Controller
				name="status"
				control={control}
				render={({ field: { name, onChange, value, disabled } }) => {
					return (
						<Select
							defaultValue="all"
							name={name}
							onValueChange={onChange}
							value={value}
							disabled={disabled}
						>
							<SelectTrigger className="h-8 w-[160px]">
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all">Todos</SelectItem>
								<SelectItem value="paid">Pago</SelectItem>
								<SelectItem value="not_paid">Não pago</SelectItem>
							</SelectContent>
						</Select>
					)
				}}
			/>

			<Button type="submit" variant="secondary" size="xs">
				<Search className="mr-2 size-4" />
				Filtrar resultados
			</Button>
			<Button
				type="button"
				variant="outline"
				size="xs"
				onClick={handleClearFilters}
			>
				<X className="mr-2 size-4" />
				Remover filtros
			</Button>
		</form>
	)
}
