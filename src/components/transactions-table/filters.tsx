import { endOfMonth, format, startOfMonth } from 'date-fns'
import { Search, X } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
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

import { DateRangePicker } from '../date-range-picker'

const transactionFilterSchema = z.object({
	date: z.object({
		from: z.date().optional(),
		to: z.date().optional(),
	}),
	name: z.string().optional(),
	category: z.string().optional(),
	transaction_type: z.string().optional(),
	payment_method: z.string().optional(),
})

type TransactionFilterSchema = z.infer<typeof transactionFilterSchema>

export function TransactionTableFilters() {
	const searchParams = useSearchParams()
	const params = new URLSearchParams(searchParams)
	const { replace } = useRouter()
	const pathname = usePathname()

	const from = params.get('from')
	const to = params.get('to')
	const name = params.get('name')
	const transaction_type = params.get('transaction_type')
	const payment_method = params.get('payment_method')
	const category = params.get('category')

	const { register, handleSubmit, control, reset } =
		useForm<TransactionFilterSchema>({
			defaultValues: {
				name: name ?? '',
				transaction_type: transaction_type ?? 'all',
				payment_method: payment_method ?? 'all',
				category: category ?? 'all',
				date: {
					from: from ? new Date(from) : startOfMonth(new Date()),
					to: to ? new Date(to) : endOfMonth(new Date()),
				},
			},
		})

	function handleFilter({
		date,
		name,
		transaction_type,
		payment_method,
		category,
	}: TransactionFilterSchema) {
		if (date.from) {
			params.set('from', String(format(date.from, 'yyyy-LL-dd')))
		} else {
			params.delete('from')
		}
		if (date.to) {
			params.set('to', String(format(date.to, 'yyyy-LL-dd')))
		} else {
			params.delete('to')
		}
		if (name) {
			params.set('name', name)
		} else {
			params.delete('name')
		}
		if (transaction_type) {
			params.set('transaction_type', transaction_type)
		} else {
			params.delete('transaction_type')
		}
		if (payment_method) {
			params.set('payment_method', payment_method)
		} else {
			params.delete('payment_method')
		}
		if (category) {
			params.set('category', category)
		} else {
			params.delete('category')
		}

		params.set('page', '1')

		replace(`${pathname}?${params.toString()}`)
	}

	function handleClearFilters() {
		params.delete('name')
		params.delete('transaction_type')
		params.delete('payment_method')
		params.delete('category')
		params.delete('from')
		params.delete('to')
		params.set('page', '1')
		replace(`${pathname}?${params.toString()}`)

		reset({
			name: '',
			transaction_type: 'all',
			category: 'all',
			payment_method: 'all',
			date: {
				from: startOfMonth(new Date()),
				to: endOfMonth(new Date()),
			},
		})
	}

	return (
		<form
			onSubmit={handleSubmit(handleFilter)}
			className="grid grid-cols-2 gap-2 lg:flex lg:items-center"
		>
			<span className="col-span-2 text-sm font-semibold">Filtros</span>
			<DateRangePicker name="date" control={control} />
			<Input
				{...register('name')}
				className="h-8 w-[192px]"
				placeholder="Nome da compra"
			/>
			<Controller
				name="transaction_type"
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
								<SelectItem value="all">Receitas/Despesas</SelectItem>
								<SelectItem value="CREDIT">Receitas</SelectItem>
								<SelectItem value="DEBIT">Despesas</SelectItem>
							</SelectContent>
						</Select>
					)
				}}
			/>
			<Controller
				name="payment_method"
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
								<SelectItem value="all">Todos métodos</SelectItem>
								<SelectItem value="MONEY">Dinheiro</SelectItem>
								<SelectItem value="PIX">PIX</SelectItem>
								<SelectItem value="DEBIT_CARD">Cartão de débito</SelectItem>
								<SelectItem value="CREDIT_CARD">Cartão de credito</SelectItem>
								<SelectItem value="BANK_TRANSFER">TED/DOC</SelectItem>
							</SelectContent>
						</Select>
					)
				}}
			/>
			<Controller
				name="category"
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
								<SelectItem value="all">Todas categorias</SelectItem>
								<SelectItem value="FOOD">Alimentação</SelectItem>
								<SelectItem value="HOME">Moradia</SelectItem>
								<SelectItem value="ENTERTAINMENT">Entretenimento</SelectItem>
								<SelectItem value="TRANSPORTATION">Transporte</SelectItem>
								<SelectItem value="SHOPPING">Compras</SelectItem>
								<SelectItem value="OTHERS">Outros</SelectItem>
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
				onClick={handleClearFilters}
				type="button"
				variant="outline"
				size="xs"
			>
				<X className="mr-2 size-4" />
				Remover filtros
			</Button>
		</form>
	)
}
