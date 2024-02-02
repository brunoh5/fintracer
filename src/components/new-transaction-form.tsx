'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { createTransaction } from '@/app/api/create-transaction'
import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { cn } from '@/utils/shad-cn-configs'

import { DatePickerInput } from './date-picker-input'
import { Calendar } from './ui/calendar'
import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from './ui/form'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Select } from './ui/select'
import { toast } from './ui/use-toast'

interface NewTransactionFormProps {
	accountId?: string | null
}

const newTransactionForm = z.object({
	accountId: z.string(),
	name: z.string(),
	shopName: z.string(),
	amount: z.string(),
	paid_at: z.date(),
	type: z.string(),
	payment_method: z.string().nullable(),
	categoryId: z.string(),
})

type NewTransactionForm = z.infer<typeof newTransactionForm>

export function NewTransaction({ accountId = null }: NewTransactionFormProps) {
	const { register, handleSubmit, control } = useForm<NewTransactionForm>({
		resolver: zodResolver(newTransactionForm),
	})

	const { mutateAsync: createTransactionFn } = useMutation({
		mutationFn: createTransaction,
	})

	async function handleCreateTransaction(data: NewTransactionForm) {
		try {
			await createTransactionFn({
				accountId: data.accountId,
				name: data.name,
				shopName: data.shopName,
				amount: data.amount,
				paid_at: data.paid_at,
				type: data.type,
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
						<Label htmlFor="amount">Estabelecimento / Site</Label>
						<Input type="number" id="amount" {...register('amount')} />
					</div>

					{/* <Select
						id="accountId"
						{...register('accountId')}
						className="data-[active=false]:hidden"
						data-active={accountId !== ''}
					></Select> */}

					{/* <DatePickerInput control={control} /> */}

					<FormField
						control={control}
						name="paid_at"
						render={({ field }) => (
							<FormItem className="flex flex-col">
								<FormLabel>Date of birth</FormLabel>
								<Popover>
									<PopoverTrigger asChild>
										<FormControl>
											<Button
												variant={'outline'}
												className={cn(
													'w-[240px] pl-3 text-left font-normal',
													!field.value && 'text-muted-foreground',
												)}
											>
												{field.value ? (
													format(field.value, 'PPP')
												) : (
													<span>Pick a date</span>
												)}
												<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
											</Button>
										</FormControl>
									</PopoverTrigger>
									<PopoverContent className="w-auto p-0" align="start">
										<Calendar
											mode="single"
											selected={field.value}
											onSelect={field.onChange}
											disabled={(date) =>
												date > new Date() || date < new Date('1900-01-01')
											}
											initialFocus
										/>
									</PopoverContent>
								</Popover>
								<FormDescription>
									Your date of birth is used to calculate your age.
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
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
