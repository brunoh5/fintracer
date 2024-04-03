'use client'

import { useQuery } from '@tanstack/react-query'
import { Search } from 'lucide-react'
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
	const { replace } = useRouter()
	const pathname = usePathname()
	const params = new URLSearchParams(searchParams)
	const { register, handleSubmit, control } = useForm<TransactionFilterSchema>()

	const transaction_type = params.get('transaction_type')

	const pageIndex = z.coerce
		.number()
		.transform((page) => page - 1)
		.parse(params.get('page') ?? '1')

	const { data: result, isLoading: isLoadingTransactions } = useQuery({
		queryKey: ['transactions', pageIndex, transaction_type],
		queryFn: () => fetchTransactions({ pageIndex, transaction_type }),
	})

	function handlePaginate(pageIndex: number) {
		const params = new URLSearchParams(searchParams)

		params.set('page', (pageIndex + 1).toString())

		replace(`${pathname}?${params.toString()}`)
	}

	function handleFilter({ name, payment_method }: TransactionFilterSchema) {
		console.log({ name, payment_method })
	}

	return (
		<div className="space-y-2.5">
			<form
				onSubmit={handleSubmit(handleFilter)}
				className="flex items-center gap-2"
			>
				<Input {...register('name')} className="h-8 w-auto" />
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
								<SelectTrigger className="h-8 w-[180px]">
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="all">Todos métodos</SelectItem>
									<SelectItem value="DEBIT_CARD">Cartão de débito</SelectItem>
									<SelectItem value="CREDIT_CARD">Cartão de credito</SelectItem>
								</SelectContent>
							</Select>
						)
					}}
				/>
				<Button type="submit" variant="secondary" size="xs">
					<Search className="mr-2 size-4" />
					Filtrar resultados
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
