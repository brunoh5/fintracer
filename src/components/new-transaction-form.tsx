'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { createTransaction } from '@/app/api/create-transaction'
import { Button } from './ui/button'
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { toast } from './ui/use-toast'
import { DatePicker } from './ui/date-picker'
import { useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { CategoryProps } from '@/types'
import { fetchCategories } from '@/app/api/fetch-categories'
import { getSession } from 'next-auth/react'
import { api } from '@/services/api'

interface NewTransactionFormProps {
	accountId: string
}

const newTransactionForm = z.object({
	name: z.string(),
	shopName: z.string(),
	amount: z.string(),
	paid_at: z.date(),
	type: z.string(),
	payment_method: z.string().nullable(),
	categoryId: z.string(),
})

type NewTransactionForm = z.infer<typeof newTransactionForm>

export function NewTransaction({ accountId }: NewTransactionFormProps) {
	const [date, setDate] = useState<Date | undefined>()

	const { register, handleSubmit } = useForm<NewTransactionForm>({
		resolver: zodResolver(newTransactionForm),
	})

	const { data: categories } = useQuery<CategoryProps[]>({
		queryKey: ['categories'],
		queryFn: async () => {
			const session = await getSession()

			const response = await api.get('/categories', {
				headers: {
					Authorization: `Bearer ${session?.user}`,
				},
			})

			return response.data.categories
		}
	})

	console.log(categories)

	const { mutateAsync: createTransactionFn } = useMutation({
		mutationFn: createTransaction,
	})

	async function handleCreateTransaction(data: NewTransactionForm) {
		console.log(data, date)

		try {
			await createTransactionFn({
				name: data.name,
				shopName: data.shopName,
				type: data.type,
				amount: data.amount,
				accountId: accountId,
				paid_at: date ?? null,
				payment_method: data.payment_method ?? '',
				categoryId: data.categoryId,
			})

			toast({
				variant: 'default',
				description: 'Transação cadastrada com sucesso',
			})
		} catch (error) {
			toast({
				variant: 'destructive',
				description: 'Erro ao cadastrar a transação',
			})
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

					<div>
						<RadioGroup defaultValue='received' {...register('type')} className='flex items-center justify-between gap-4'>
							<div className='flex items-center'>
								<RadioGroupItem value='received' id='received' />
								<Label htmlFor='received'>Recebido</Label>
							</div>
							<div className='flex items-center'>
								<RadioGroupItem value='sent' id='sent' />
								<Label htmlFor='sent'>Enviado</Label>
							</div>
						</RadioGroup>
					</div>

					{/* <Select
						disabled={accountId !== null}
						defaultValue={accountId ? accountId : undefined}
						{...register('accountId')}
					>
						<SelectTrigger id='accountId'>
							<SelectValue placeholder='Selecione a conta' />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value='conta1'>Conta 1</SelectItem>
							<SelectItem value='conta2'>Conta 2</SelectItem>
							<SelectItem value='conta3'>Conta 3</SelectItem>
							<SelectItem value='conta4'>Conta 4</SelectItem>
							<SelectItem value='conta5'>Conta 5</SelectItem>
						</SelectContent>
					</Select> */}

					<div>
						<Label htmlFor='categoryId'>Qual categoria armazenar essa transação ?</Label>
						<Select
							{...register('categoryId')}
						>
							<SelectTrigger id='categoryId'>
								<SelectValue placeholder='Selecione a categoria da transação' />
							</SelectTrigger>
							<SelectContent>
								{categories?.map((category: CategoryProps) => (
									<SelectItem key={category.id} value={category.id}>
										{category.name}
									</SelectItem>
								))}
							</SelectContent>

						</Select>
					</div>

					<DatePicker date={date} onDateChange={setDate} />
				</form>

				<DialogFooter className="flex items-center justify-end">
					<DialogClose asChild>
						<Button type="reset" form="new-transaction-form">
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
