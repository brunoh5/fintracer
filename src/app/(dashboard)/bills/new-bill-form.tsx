'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Plus } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { createBill } from '@/api/create-bill'
import { fetchAccounts } from '@/api/fetch-accounts'
import { GetBillsResponse } from '@/api/get-bill'
import { ControlledSelect } from '@/components/controlled-select'
import { PriceInput } from '@/components/price-input'
import { Button } from '@/components/ui/button'
import { DatePicker } from '@/components/ui/date-picker'
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { AccountProps } from '@/types'

const newBillForm = z.object({
	title: z.string(),
	description: z.string().optional(),
	amount: z.string(),
	dueDate: z.date(),
	paid_at: z.date().optional(),
	payment_method: z
		.enum(['MONEY', 'PIX', 'CREDIT_CARD', 'DEBIT_CARD', 'BANK_TRANSFER'])
		.default('MONEY'),
	accountId: z.string().optional(),
	// documentNumber: z.string().nullable(),
	// description: z.string().nullable(),
	// carrier: z.string().nullable(),
	// occurrence: z.string().nullable(),
	period: z.enum(['only', 'monthly', 'anual']),
})

type NewBillForm = z.infer<typeof newBillForm>

export function NewBillForm() {
	const queryClient = useQueryClient()
	const {
		register,
		handleSubmit,
		control,
		reset,
		formState: { isSubmitting },
	} = useForm<NewBillForm>()

	const { data: resume } = useQuery({
		queryKey: ['resume-accounts'],
		queryFn: fetchAccounts,
	})

	async function handleResetForm() {
		reset({
			title: '',
			description: '',
			amount: '0',
			dueDate: new Date(),
			paid_at: undefined,
			period: 'monthly',
		})
	}

	const { mutateAsync: createBillFn } = useMutation({
		mutationKey: ['bills'],
		mutationFn: createBill,
		async onSuccess(data: unknown) {
			const billsList = queryClient.getQueriesData<GetBillsResponse>({
				queryKey: ['bills'],
			})

			billsList.forEach(([cacheKey, cacheData]) => {
				if (!cacheData) {
					// eslint-disable-next-line no-useless-return
					return
				}

				queryClient.setQueryData(cacheKey, {
					...cacheData,
					bills: [data, ...cacheData.bills],
				})
			})

			handleResetForm()
		},
	})

	async function handleCreateBill(data: NewBillForm) {
		try {
			await createBillFn({
				title: data.title,
				description: data.description,
				dueDate: data.dueDate,
				paid_at: data.paid_at,
				amount: Number(data.amount),
				period: data.period,
			})
			toast.success('Despesa cadastrada com sucesso')
		} catch {
			toast.error('Erro ao cadastrar a despesa')
		}
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					variant="ghost"
					className='className="flex text-gray-500" items-center justify-center gap-4'
				>
					<Plus size={16} />
					Nova Despesa
				</Button>
			</DialogTrigger>

			<DialogContent>
				<DialogHeader className="space-y-2">
					<DialogTitle>Conta a pagar</DialogTitle>
					<DialogDescription>Adicione uma nova despesa </DialogDescription>
				</DialogHeader>

				<form
					onSubmit={handleSubmit(handleCreateBill)}
					className="flex flex-col gap-4"
					id="new-bill-form"
				>
					<div>
						<Label htmlFor="title" className="font-bold">
							Título
						</Label>
						<Input id="title" {...register('title')} />
					</div>

					<div className="grid grid-cols-2 gap-x-4">
						<div>
							<Label htmlFor="dueDate">Data de vencimento</Label>
							<Controller
								name="dueDate"
								control={control}
								render={({ field: { onChange, value } }) => {
									return (
										<DatePicker
											date={value}
											onDateChange={onChange}
											className="w-full"
										/>
									)
								}}
							/>
						</div>

						<div>
							<Label htmlFor="amount">Valor</Label>
							<PriceInput name="amount" control={control} />
						</div>
					</div>
					<div className="flex flex-col">
						<Label htmlFor="description" className="font-bold">
							Descrição
						</Label>
						<Textarea
							{...register('description')}
							id="description"
							className="h-full max-h-20 w-full resize-none"
						/>
					</div>

					<div>
						<Label htmlFor="accountId">Selecione uma conta</Label>
						<Controller
							name="accountId"
							control={control}
							render={({ field: { name, onChange, value, disabled } }) => {
								return (
									<Select
										name={name}
										onValueChange={onChange}
										value={value}
										disabled={disabled}
									>
										<SelectTrigger className="h-8">
											<SelectValue placeholder="Selecione a conta que a transação pertence" />
										</SelectTrigger>
										<SelectContent>
											{resume?.accounts?.map((account: AccountProps) => (
												<SelectItem key={account.id} value={account.id}>
													{account.bank}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								)
							}}
						/>
					</div>

					<div>
						<Label htmlFor="payment_method" className="font-bold">
							Forma de pagamento
						</Label>
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
										<SelectTrigger className="h-8">
											<SelectValue placeholder="Selecione a o método de pagamento" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="MONEY">Dinheiro</SelectItem>
											<SelectItem value="PIX">Pix</SelectItem>
											<SelectItem value="CREDIT_CARD">
												Cartão de Credito
											</SelectItem>
											<SelectItem value="DEBIT_CARD">
												Cartão de Debito
											</SelectItem>
											<SelectItem value="BANK_TRANSFER">
												Transferência Bancaria
											</SelectItem>
										</SelectContent>
									</Select>
								)
							}}
						/>
					</div>

					<div>
						<Label htmlFor="period" className="font-bold">
							Ocorrência
						</Label>
						<ControlledSelect
							{...register('period')}
							placeholder="Selecione a ocorrência do pagamento"
							control={control}
							id="period"
						>
							<SelectItem value="only">Única</SelectItem>
							<SelectItem value="monthly">Mensal</SelectItem>
							<SelectItem value="anual">Anual</SelectItem>
						</ControlledSelect>
					</div>
				</form>

				<DialogFooter className="flex items-center justify-end">
					<DialogClose asChild>
						<Button
							type="button"
							form="new-bill-form"
							variant="destructive"
							disabled={isSubmitting}
							onClick={handleResetForm}
						>
							Cancelar
						</Button>
					</DialogClose>

					<Button type="submit" form="new-bill-form" disabled={isSubmitting}>
						Salvar
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
