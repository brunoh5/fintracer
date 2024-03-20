'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Plus } from 'lucide-react'
import { getSession } from 'next-auth/react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { createBill } from '@/api/create-bill'
import { ControlledSelect } from '@/components/controlled-select'
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
import { SelectItem } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { BillsProps } from '@/types'

const newBillForm = z.object({
	supplier: z.string(),
	amount: z.coerce.number(),
	documentNumber: z.string().nullable(),
	description: z.string().nullable(),
	paymentMethod: z.string().nullable(),
	carrier: z.string().nullable(),
	occurrence: z.string().nullable(),
	period: z.enum(['only', 'monthly', 'anual']),
})

type NewBillForm = z.infer<typeof newBillForm>

export function NewBillForm() {
	const queryClient = useQueryClient()
	const { register, handleSubmit, control } = useForm<NewBillForm>()

	const [originalDueDate, setOriginalDueDate] = useState<Date | undefined>()
	const [dueDate, setDueDate] = useState<Date | undefined>()
	const [emissionDate, setEmissionDate] = useState<Date | undefined>()
	const [paymentDayOrder, setPaymentDayOrder] = useState<Date | undefined>()

	const { mutateAsync: createBillFn } = useMutation({
		mutationKey: ['bills'],
		mutationFn: createBill,
		onMutate: async (newData) => {
			await queryClient.cancelQueries({
				queryKey: ['bills'],
			})

			const previousData = queryClient.getQueryData(['bills'])

			queryClient.setQueryData(['bills'], (old: BillsProps[]) => [
				...old,
				newData,
			])

			return previousData
		},
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		onError: (_, __, context: any) => {
			queryClient.setQueryData(['bills'], context.previousData)
		},
		onSettled: () => {
			queryClient.invalidateQueries({
				queryKey: ['bills'],
			})
		},
	})

	async function handleCreateBill(data: NewBillForm) {
		const session = await getSession()

		console.log({
			...data,
			originalDueDate,
			dueDate,
			emissionDate,
			paymentDayOrder,
		})

		try {
			await createBillFn({
				session,
				data: {
					...data,
					originalDueDate,
					dueDate,
					emissionDate,
					paymentDayOrder,
				},
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
					<p className="text-xs font-bold">
						<span className="text-red-700">(*)</span> Campos obrigatórios
					</p>
				</DialogHeader>

				<form
					onSubmit={handleSubmit(handleCreateBill)}
					className="flex flex-col gap-4"
					id="new-bill-form"
				>
					<div>
						<Label htmlFor="supplier" className="font-bold">
							Fornecedor<span className="text-red-700">*</span>
						</Label>
						<Input
							id="supplier"
							placeholder="Nome do fornecedor"
							{...register('supplier')}
						/>
					</div>

					<div className="grid grid-cols-3 gap-x-4">
						<div>
							<Label htmlFor="original_due_date">Venc. original</Label>
							<DatePicker
								date={originalDueDate}
								onDateChange={setOriginalDueDate}
								className="w-full overflow-hidden"
								id="original_due_date"
							/>
						</div>

						<div>
							<Label htmlFor="due_date">
								Vencimento<span className="text-red-700">*</span>
							</Label>
							<DatePicker
								date={dueDate}
								onDateChange={setDueDate}
								className="w-full overflow-hidden"
								id="due_date"
							/>
						</div>

						<div>
							<Label htmlFor="amount" className="font-bold">
								Valor(R$)<span className="text-red-700">*</span>
							</Label>
							<Input type="text" {...register('amount')} id="amount" />
						</div>

						<div>
							<Label htmlFor="emission_date">Data da emissão</Label>
							<DatePicker
								date={emissionDate}
								onDateChange={setEmissionDate}
								className="w-full overflow-hidden"
								id="emission_date"
							/>
						</div>

						<div>
							<Label htmlFor="document_number" className="font-bold">
								N° documento
							</Label>
							<Input {...register('documentNumber')} id="document_number" />
						</div>

						<div>
							<Label htmlFor="payment_day_order">Competência</Label>
							<DatePicker
								date={paymentDayOrder}
								onDateChange={setPaymentDayOrder}
								className="w-full overflow-hidden"
								id="payment_day_order"
							/>
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
						<Label htmlFor="payment_method" className="font-bold">
							Forma de pagamento
						</Label>
						<ControlledSelect
							{...register('paymentMethod')}
							placeholder="Selecione o método de pagamento"
							control={control}
							id="payment_method"
						>
							<SelectItem value="money">Dinheiro</SelectItem>
							<SelectItem value="PIX">Pix</SelectItem>
							<SelectItem value="credit-card">Cartão de Credito</SelectItem>
							<SelectItem value="debit-card">Cartão de Debito</SelectItem>
							<SelectItem value="bank-check">Cheque Bancário</SelectItem>
							<SelectItem value="bank-transfer">
								Transferência Bancaria
							</SelectItem>
						</ControlledSelect>
					</div>

					<div className="sr-only">
						<Label htmlFor="categoryId" className="font-bold">
							Categoria
						</Label>
						<select id="categoryId">
							<option value="">Selecione</option>
						</select>
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
						<Button type="reset" form="new-bill-form" variant="destructive">
							Cancelar
						</Button>
					</DialogClose>

					<Button type="submit" form="new-bill-form">
						Salvar
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
