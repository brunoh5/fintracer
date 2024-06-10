import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { PriceInput } from '@/components/price-input'
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

export const formSchema = z.object({
	id: z.string(),
	accountId: z.string(),
	paid_at: z.coerce.date().optional(),
	paid_amount: z.string().optional(),
})

type FormValues = z.infer<typeof formSchema>

type Props = {
	id?: string
	accountOptions: { label: string; value: string }[]
	disabled?: boolean
	onSubmit: (values: FormValues) => void
}

export function PayBillForm({ id, accountOptions, onSubmit, disabled }: Props) {
	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
	})

	function handleSubmit(values: FormValues) {
		onSubmit(values)
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(handleSubmit)}
				className="space-y-4 pt-4"
			>
				<FormField
					name="id"
					defaultValue={id}
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input type="hidden" {...field} />
							</FormControl>
						</FormItem>
					)}
				/>

				<FormField
					name="accountId"
					control={form.control}
					render={({ field: { value, onChange } }) => (
						<FormItem>
							<FormLabel>Banco</FormLabel>
							<FormControl>
								<SelectPrimitive
									placeholder="Selecione a conta para essa transação"
									options={accountOptions}
									value={value}
									onChange={onChange}
									disabled={disabled}
								/>
							</FormControl>
						</FormItem>
					)}
				/>

				<FormField
					name="paid_at"
					control={form.control}
					render={({ field: { onChange, value } }) => {
						return (
							<FormItem>
								<FormLabel>Data de pagamento</FormLabel>
								<FormControl>
									<DatePicker
										date={value}
										onDateChange={onChange}
										className="w-full"
									/>
								</FormControl>
							</FormItem>
						)
					}}
				/>

				<FormField
					name="paid_amount"
					control={form.control}
					render={({ field: { name } }) => {
						return (
							<FormItem>
								<FormLabel>Valor de pagamento (opcional)</FormLabel>
								<FormControl>
									<PriceInput name={name} control={form.control} />
								</FormControl>
							</FormItem>
						)
					}}
				/>

				<Button className="w-full text-white" disabled={disabled}>
					Pagar despesa
				</Button>
			</form>
		</Form>
	)
}
