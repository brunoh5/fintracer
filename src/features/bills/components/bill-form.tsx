import { zodResolver } from '@hookform/resolvers/zod'
import { Trash } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { PriceInput } from '@/components/price-input'
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
import { Textarea } from '@/components/ui/textarea'

export const formSchema = z.object({
	title: z.string(),
	description: z.string().optional(),
	amount: z.string(),
	dueDate: z.date(),
	period: z.enum(['only', 'monthly', 'anual']),
})

type FormValues = z.infer<typeof formSchema>

type Props = {
	id?: string
	defaultValues?: FormValues
	onSubmit: (values: FormValues) => void
	onDelete?: () => void
	disabled?: boolean
}

export function BillForm({
	id,
	defaultValues,
	onSubmit,
	onDelete,
	disabled,
}: Props) {
	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues,
	})

	function handleSubmit(values: FormValues) {
		onSubmit(values)
	}

	function handleDelete() {
		onDelete?.()
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(handleSubmit)}
				className="space-y-4 pt-4"
			>
				<FormField
					name="title"
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Titulo</FormLabel>
							<FormControl>
								<Input
									disabled={disabled}
									placeholder="e.g. Energia, Água, Internet"
									{...field}
								/>
							</FormControl>
						</FormItem>
					)}
				/>

				<FormField
					name="dueDate"
					control={form.control}
					render={({ field: { onChange, value } }) => {
						return (
							<FormItem>
								<FormLabel>Data de vencimento</FormLabel>
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
					name="amount"
					control={form.control}
					render={({ field: { name } }) => {
						return (
							<FormItem>
								<FormLabel>Data de vencimento</FormLabel>
								<FormControl>
									<PriceInput name={name} control={form.control} />
								</FormControl>
							</FormItem>
						)
					}}
				/>

				<FormField
					name="description"
					control={form.control}
					render={({ field: { name, onChange, value } }) => {
						return (
							<FormItem>
								<FormLabel>Descrição</FormLabel>
								<FormControl>
									<Textarea
										name={name}
										value={value}
										onChange={onChange}
										className="h-full max-h-20 w-full resize-none"
									/>
								</FormControl>
							</FormItem>
						)
					}}
				/>

				<FormField
					name="period"
					control={form.control}
					render={({ field: { name, onChange, value } }) => {
						return (
							<FormItem>
								<FormLabel>Período de cobrança</FormLabel>
								<FormControl>
									<Select name={name} onValueChange={onChange} value={value}>
										<SelectTrigger>
											<SelectValue placeholder="Selecione o periodo da despesa" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="only">Única</SelectItem>
											<SelectItem value="monthly">Mensal</SelectItem>
											<SelectItem value="anual">Anual</SelectItem>
										</SelectContent>
									</Select>
								</FormControl>
							</FormItem>
						)
					}}
				/>

				<Button className="w-full text-white" disabled={disabled}>
					{id ? 'Salvar alterações' : 'Criar conta'}
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
						Deletar conta
					</Button>
				)}
			</form>
		</Form>
	)
}
