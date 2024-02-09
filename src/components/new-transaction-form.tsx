/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getSession } from 'next-auth/react'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { createTransaction } from '@/app/api/create-transaction'
import { fetchAccounts } from '@/app/api/fetch-accounts'
import { fetchCategories } from '@/app/api/fetch-categories'
import { AccountProps, CategoryProps } from '@/types'

import { Button } from './ui/button'
import { DatePicker } from './ui/date-picker'
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from './ui/dialog'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from './ui/select'

interface NewTransactionFormProps {
	accountId: string
}

const newTransactionForm = z.object({
	name: z.string({
		required_error: 'Please type a name for transaction',
	}),
	accountId: z.any(),
	shopName: z.string(),
	amount: z.coerce.number(),
	type: z.any(),
	payment_method: z.string(),
	categoryId: z.any(),
})

type NewTransactionForm = z.infer<typeof newTransactionForm>

export function NewTransaction({ accountId }: NewTransactionFormProps) {
	const queryClient = useQueryClient()
	const [date, setDate] = useState<Date | undefined>()

	const { register, handleSubmit, control } = useForm<NewTransactionForm>({
		resolver: zodResolver(newTransactionForm),
	})

	const { data: categories } = useQuery({
		queryKey: ['categories'],
		queryFn: async () => {
			const session = await getSession()

			return fetchCategories({ session })
		},
	})

	const { data: accounts } = useQuery({
		queryKey: ['accounts'],
		queryFn: async () => {
			const session = await getSession()

			return fetchAccounts({ session })
		},
	})

	const { mutateAsync: createTransactionFn } = useMutation({
		mutationKey: ['account', 'transactions', accountId],
		mutationFn: createTransaction,
		onMutate: async (newData) => {
			await queryClient.cancelQueries({
				queryKey: ['account', 'transactions', accountId],
			})

			const previousData = queryClient.getQueryData([
				'account',
				'transactions',
				accountId,
			])

			queryClient.setQueryData(
				['account', 'transactions', accountId],
				(old: AccountProps[]) => [...old, newData],
			)

			return previousData
		},
		onError: (_, __, context: any) => {
			queryClient.setQueryData(
				['account', 'transactions', accountId],
				context.previousData,
			)
		},
		onSettled: () => {
			queryClient.invalidateQueries({
				queryKey: ['account', 'transactions', accountId],
			})

			queryClient.invalidateQueries({
				queryKey: ['accounts', accountId],
			})
		},
		onSuccess(_, variables, __) {
			const cachedAccount = queryClient.getQueryData<AccountProps>([
				'accounts',
				accountId,
			])

			console.log(cachedAccount)

			if (cachedAccount) {
				queryClient.setQueryData(
					['accounts', accountId],
					Object.assign(cachedAccount, {
						balance: Number(cachedAccount.balance) + variables.data.amount,
					}),
				)
			}
		},
	})

	async function handleCreateTransaction(data: NewTransactionForm) {
		const session = await getSession()

		try {
			await createTransactionFn({
				session,
				data: {
					name: data.name,
					shopName: data.shopName,
					type: data.type,
					amount: data.amount,
					accountId: data.accountId,
					paid_at: date ?? null,
					payment_method: data.payment_method ?? '',
					categoryId: data.categoryId,
				},
			})

			toast.success('Transação cadastrada com sucesso')
		} catch {
			toast.error('Erro ao cadastrar a transação')
		}
	}

	return (
		<Dialog>
			<DialogTrigger>Nova Transação</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Criar transação</DialogTitle>
				</DialogHeader>

				<form
					id="new-transaction-form"
					onSubmit={handleSubmit(handleCreateTransaction)}
					className="flex flex-col gap-4"
				>
					<div>
						<Label htmlFor="name">Nome da transação</Label>
						<Input type="text" id="name" {...register('name')} />
					</div>

					<div>
						<Label htmlFor="shopName">Estabelecimento / Site</Label>
						<Input type="text" id="shopName" {...register('shopName')} />
					</div>

					<div>
						<Label htmlFor="amount">Valor</Label>
						<Input type="number" id="amount" {...register('amount')} />
					</div>

					<div className="flex items-center justify-center"></div>

					<Controller
						name="type"
						control={control}
						defaultValue="received"
						render={({ field: { name, onChange, value, disabled } }) => {
							return (
								<RadioGroup
									name={name}
									onValueChange={onChange}
									value={value}
									disabled={disabled}
									className="flex items-center justify-between gap-4"
								>
									<div className="flex items-center gap-2 rounded border bg-green-700 p-4 text-white">
										<RadioGroupItem value="received" id="received" />
										<Label htmlFor="received">Recebido</Label>
									</div>
									<div className="flex items-center gap-2 rounded border bg-red-700 p-4 text-white">
										<RadioGroupItem value="sent" id="sent" />
										<Label htmlFor="sent">Enviado</Label>
									</div>
								</RadioGroup>
							)
						}}
					/>

					<Controller
						name="accountId"
						control={control}
						defaultValue={accountId}
						render={({ field: { name, onChange, value, disabled } }) => {
							return (
								<Select
									name={name}
									onValueChange={onChange}
									value={value}
									disabled={disabled}
								>
									<SelectTrigger className="h-8 w-[180px]">
										<SelectValue placeholder="Selecione a conta que a transação pertence" />
									</SelectTrigger>
									<SelectContent>
										{accounts?.map((account: AccountProps) => (
											<SelectItem key={account.id} value={account.id}>
												{account.bank}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							)
						}}
					/>

					<Controller
						name="categoryId"
						control={control}
						render={({ field: { name, onChange, value, disabled } }) => {
							return (
								<Select
									name={name}
									onValueChange={onChange}
									value={value}
									disabled={disabled}
								>
									<SelectTrigger className="h-8 w-[180px]">
										<SelectValue placeholder="Selecione a categoria da transação" />
									</SelectTrigger>
									<SelectContent>
										{categories?.map((category: CategoryProps) => (
											<SelectItem key={category.id} value={category.id}>
												{category.name}
											</SelectItem>
										))}
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
									name={name}
									onValueChange={onChange}
									value={value}
									disabled={disabled}
								>
									<SelectTrigger className="h-8 w-[180px]">
										<SelectValue placeholder="Selecione a o método de pagamento" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="money">Dinheiro</SelectItem>
										<SelectItem value="PIX">Pix</SelectItem>
										<SelectItem value="credit_card">
											Cartão de Credito
										</SelectItem>
										<SelectItem value="debit_card">Cartão de Debito</SelectItem>
										<SelectItem value="bank_check">Cheque Bancário</SelectItem>
										<SelectItem value="bank_transfer">
											Transferência Bancaria
										</SelectItem>
									</SelectContent>
								</Select>
							)
						}}
					/>

					<div>
						<Label htmlFor="paid_at">
							Data do pagamento, caso tenha sido pago.
						</Label>
						<DatePicker
							date={date}
							onDateChange={setDate}
							className="w-full"
							id="paid_at"
						/>
					</div>
				</form>

				<DialogFooter className="flex items-center justify-end">
					<DialogClose asChild>
						<Button
							type="reset"
							form="new-transaction-form"
							variant="destructive"
						>
							Cancelar
						</Button>
					</DialogClose>

					<Button type="submit" form="new-transaction-form">
						Salvar
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
