'use client'

import { useQuery } from '@tanstack/react-query'
import { Search, X } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

import { fetchTransactions } from '@/api/fetch-transactions'
import { Pagination } from '@/components/pagination'
import { TransactionTableSkeleton } from '@/components/transaction-table-skeleton'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import {
	Table,
	TableBody,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'

import { TransactionTableRow } from './transaction-table-row'

const transactionFilterSchema = z.object({
	name: z.string().optional(),
	category: z.string().optional(),
	date: z.string().optional(),
	transaction_type: z.string().optional(),
	payment_method: z.string().optional(),
})

type TransactionFilterSchema = z.infer<typeof transactionFilterSchema>

export function TransactionsList() {
	const searchParams = useSearchParams()
	const params = new URLSearchParams(searchParams)
	const { replace } = useRouter()
	const pathname = usePathname()

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
			},
		})

	const pageIndex = z.coerce
		.number()
		.transform((page) => page - 1)
		.parse(params.get('page') ?? '1')

	const { data: result, isLoading: isLoadingTransactions } = useQuery({
		queryKey: [
			'transactions',
			pageIndex,
			name,
			transaction_type,
			payment_method,
			category,
		],
		queryFn: () =>
			fetchTransactions({
				pageIndex,
				name,
				transaction_type: transaction_type === 'all' ? null : transaction_type,
				payment_method: payment_method === 'all' ? null : payment_method,
				category: category === 'all' ? null : category,
			}),
	})

	function handlePaginate(pageIndex: number) {
		// const params = new URLSearchParams(searchParams)

		params.set('page', (pageIndex + 1).toString())

		replace(`${pathname}?${params.toString()}`)
	}

	function handleFilter({
		name,
		transaction_type,
		payment_method,
		category,
	}: TransactionFilterSchema) {
		// const params = new URLSearchParams(searchParams)

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
		params.set('page', '1')
		replace(`${pathname}?${params.toString()}`)

		reset({
			name: '',
			transaction_type: 'all',
			category: 'all',
			payment_method: 'all',
		})
	}

	return (
		<div className="space-y-2.5">
			<form
				onSubmit={handleSubmit(handleFilter)}
				className="flex items-center gap-2"
			>
				<span className="text-sm font-semibold">Filtros</span>
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

			<div className="rounded-md border">
				<Table>
					<TableHeader className="font-bold">
						<TableRow>
							<TableHead className="w-[80px]"></TableHead>
							<TableHead>Nome</TableHead>
							<TableHead className="w-[140px] text-center">
								Estabelecimento
							</TableHead>
							<TableHead className="w-[140px] text-center">Categoria</TableHead>
							<TableHead className="w-[140px] ">Data</TableHead>
							<TableHead className="w-[140px] ">Pagamento</TableHead>
							<TableHead className="w-[140px] text-center">Valor</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{isLoadingTransactions && <TransactionTableSkeleton />}

						{result &&
							result.transactions.map((transaction) => {
								return (
									<TransactionTableRow
										key={transaction.id}
										transaction={transaction}
									/>
								)
							})}
					</TableBody>
				</Table>
			</div>

			{result && (
				<Pagination
					pageIndex={result.meta.pageIndex}
					totalCount={result.meta.totalCount}
					perPage={result.meta.perPage}
					onPageChange={handlePaginate}
				/>
			)}
		</div>
	)
}
