import { zodResolver } from '@hookform/resolvers/zod'
import { Trash } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { AmountInput } from '@/components/amount-input'
import { Select as SelectPrimitive } from '@/components/select'
import { Button } from '@/components/ui/button'
import { DatePicker } from '@/components/ui/date-picker'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'

export const formSchema = z.object({
	name: z.string(),
	accountId: z.string(),
	shopName: z.any(),
	amount: z.any(),
	date: z.coerce.date().optional(),
	payment_method: z
		.enum(['MONEY', 'PIX', 'CREDIT_CARD', 'DEBIT_CARD', 'BANK_TRANSFER'])
		.default('MONEY'),
	category: z
		.enum([
			'FOOD',
			'HOME',
			'TRANSPORTATION',
			'OTHERS',
			'SHOPPING',
			'ENTERTAINMENT',
		])
		.default('OTHERS'),
	transaction_type: z.enum(['CREDIT', 'DEBIT']).optional(),
})

type FormValues = z.infer<typeof formSchema>

type Props = {
	id?: string
	accountId?: string
	defaultValues?: FormValues
	onSubmit: (values: FormValues) => void
	onDelete?: () => void
	disabled?: boolean
	accountOptions: { label: string; value: string }[]
	onCreateAccount: (name: string) => void
}

export function TransactionForm({
	id,
	accountId,
	defaultValues,
	onSubmit,
	onDelete,
	disabled,
	accountOptions,
	onCreateAccount,
}: Props) {
	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues,
	})

	function handleSubmit(values: FormValues) {
		onSubmit({ ...values, amount: Number(values.amount) })
	}

	function handleDelete() {
		onDelete?.()
	}

	const defaultAccountValue = accountOptions.find(
		(account) => account.value === accountId,
	)

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(handleSubmit)}
				className="space-y-4 pt-4"
			>
				<FormField
					name="accountId"
					control={form.control}
					defaultValue={defaultAccountValue?.value}
					render={({ field: { value, onChange } }) => (
						<FormItem>
							<FormLabel>Banco</FormLabel>
							<FormControl>
								<SelectPrimitive
									placeholder="Selecione a conta para essa transação"
									options={accountOptions}
									onCreate={onCreateAccount}
									value={value}
									onChange={onChange}
									disabled={disabled}
								/>
							</FormControl>
						</FormItem>
					)}
				/>

				<FormField
					name="name"
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Titulo da transação</FormLabel>
							<FormControl>
								<Input
									disabled={disabled}
									placeholder="e.g. Pagamento da fatura"
									{...field}
								/>
							</FormControl>
						</FormItem>
					)}
				/>

				<FormField
					name="shopName"
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Local da compra</FormLabel>
							<FormControl>
								<Input
									disabled={disabled}
									placeholder="e.g. Walmart"
									{...field}
								/>
							</FormControl>
						</FormItem>
					)}
				/>

				<FormField
					name="amount"
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Valor da transação</FormLabel>
							<FormControl>
								<AmountInput
									{...field}
									disabled={disabled}
									placeholder="0,00"
								/>
							</FormControl>
						</FormItem>
					)}
				/>

				<FormField
					name="category"
					control={form.control}
					render={({ field: { name, onChange, value, disabled } }) => {
						return (
							<FormItem>
								<FormLabel>Categoria</FormLabel>
								<Select
									name={name}
									onValueChange={onChange}
									value={value}
									disabled={disabled}
								>
									<SelectTrigger className="h-8">
										<SelectValue placeholder="Selecione a categoria da transação" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="FOOD">Alimentação</SelectItem>
										<SelectItem value="SHOPPING">Compras</SelectItem>
										<SelectItem value="HOME">Moradia</SelectItem>
										<SelectItem value="TRANSPORTATION">Transporte</SelectItem>
										<SelectItem value="ENTERTAINMENT">
											Entretenimento
										</SelectItem>
										<SelectItem value="OTHERS">Outros</SelectItem>
									</SelectContent>
								</Select>
							</FormItem>
						)
					}}
				/>

				<FormField
					name="payment_method"
					control={form.control}
					render={({ field: { name, onChange, value, disabled } }) => {
						return (
							<FormItem>
								<FormLabel>Método de pagamento</FormLabel>
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
										<SelectItem value="DEBIT_CARD">Cartão de Debito</SelectItem>
										<SelectItem value="BANK_TRANSFER">
											Transferência Bancaria
										</SelectItem>
									</SelectContent>
								</Select>
							</FormItem>
						)
					}}
				/>

				<FormField
					name="date"
					control={form.control}
					render={({ field: { onChange, value } }) => (
						<FormItem>
							<FormLabel>Data da transação</FormLabel>
							<FormControl>
								<DatePicker
									date={value}
									onDateChange={onChange}
									className="w-full"
								/>
							</FormControl>
						</FormItem>
					)}
				/>

				<Button className="w-full text-white" disabled={disabled}>
					{id ? 'Salvar alterações' : 'Criar Transação'}
				</Button>

				{!!id && (
					<Button
						className="w-full"
						disabled={disabled}
						type="button"
						onClick={handleDelete}
						variant="outline"
					>
						<Trash className="mr-2 size-4" />
						Deletar Transação
					</Button>
				)}
			</form>
		</Form>
	)
}
