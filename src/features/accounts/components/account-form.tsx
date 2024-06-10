import { zodResolver } from '@hookform/resolvers/zod'
import { Trash } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
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

const formSchema = z.object({
	type: z
		.enum([
			'CURRENT_ACCOUNT',
			'SAVINGS_ACCOUNT',
			'INVESTMENT_ACCOUNT',
			'MACHINE_ACCOUNT',
		])
		.default('CURRENT_ACCOUNT'),
	bank: z.string(),
	number: z.string().optional(),
	initialAmount: z.coerce.number().optional(),
})

type FormValues = z.infer<typeof formSchema>

type Props = {
	id?: string
	defaultValues?: FormValues
	onSubmit: (values: FormValues) => void
	onDelete?: () => void
	disabled?: boolean
}

export function AccountForm({
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
					name="bank"
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Titulo da conta</FormLabel>
							<FormControl>
								<Input
									disabled={disabled}
									placeholder="e.g. Nubank, Inter, Sicoob"
									{...field}
								/>
							</FormControl>
						</FormItem>
					)}
				/>

				<FormField
					name="type"
					control={form.control}
					render={({ field: { name, onChange, value, disabled } }) => {
						return (
							<Select
								name={name}
								onValueChange={onChange}
								value={value}
								disabled={disabled}
							>
								<SelectTrigger className="h-8">
									<SelectValue placeholder="Selecione o tipo da conta" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="CURRENT_ACCOUNT">
										Conta corrente
									</SelectItem>
									<SelectItem value="MACHINE_ACCOUNT">
										Maquina de Cartão
									</SelectItem>
								</SelectContent>
							</Select>
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
