import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

import { editTransaction } from '@/api/edit-transaction'
import { fetchAccounts } from '@/api/fetch-accounts'
import { GetAccountResponse } from '@/api/get-account'
import {
	getTransactionDetails,
	GetTransactionDetailsResponse,
} from '@/api/get-transaction-details'
import {
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'

import { PriceInput } from '../price-input'
import { Button } from '../ui/button'
import { DatePicker } from '../ui/date-picker'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../ui/select'

interface TransactionsDetailsProps {
	transactionId: string
	open: boolean
}

const editTransactionSchema = z.object({
	name: z.string(),
	accountId: z.string(),
	shopName: z.string().optional(),
	amount: z.string(),
	created_at: z.date().optional(),
	transaction_type: z.enum(['DEBIT', 'CREDIT']),
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
})

type EditTransactionsSchema = z.infer<typeof editTransactionSchema>

export function EditTransaction({
	transactionId,
	open,
}: TransactionsDetailsProps) {
	const queryClient = useQueryClient()

	const { data: transaction } = useQuery({
		queryKey: ['transaction', transactionId],
		queryFn: () => getTransactionDetails({ transactionId }),
		enabled: open,
	})

	const { data: resume } = useQuery({
		queryKey: ['resume-accounts'],
		queryFn: fetchAccounts,
		enabled: open,
	})

	const { register, control, reset, handleSubmit } =
		useForm<EditTransactionsSchema>({
			resolver: zodResolver(editTransactionSchema),
			values: {
				name: transaction?.name ?? '',
				shopName: transaction?.shopName ?? '',
				payment_method: transaction?.payment_method ?? 'MONEY',
				accountId: transaction?.accountId ?? '',
				amount: String(transaction?.amount) ?? '',
				transaction_type: transaction?.transaction_type ?? 'DEBIT',
				category: transaction?.category ?? 'OTHERS',
				created_at: transaction?.created_at
					? new Date(transaction.created_at)
					: undefined,
			},
		})

	const { mutateAsync: editTransactionFn } = useMutation({
		mutationFn: editTransaction,
		onSuccess: (data: GetTransactionDetailsResponse) => {
			console.log(data)
			const account = queryClient.getQueryData<GetAccountResponse>([
				'accounts',
				data.transaction.accountId,
			])

			let total = 0

			if (account) {
				switch (data.transaction.transaction_type) {
					case 'CREDIT':
						total = (account?.balanceInCents + data.transaction.amount) / 100
						break
					case 'DEBIT':
						total = (account?.balanceInCents - data.transaction.amount) / 100
						break
					default:
						console.log('Um erro ocorreu')
				}

				queryClient.setQueryData(['accounts', account.id], {
					...account,
					balance: total,
				})
			}
		},
	})

	function handleEditTransaction(data: EditTransactionsSchema) {
		editTransactionFn(data)
	}

	return (
		<DialogContent>
			<DialogHeader>
				<DialogTitle>Transação</DialogTitle>
				<DialogDescription>Detalhes da transação</DialogDescription>
			</DialogHeader>

			<form
				id="edit-transaction-form"
				onSubmit={handleSubmit(handleEditTransaction)}
				className="space-y-4"
			>
				<div className="space-y-2">
					<Label htmlFor="name">Nome da transação</Label>
					<Input type="text" id="name" {...register('name')} />
				</div>

				<div className="space-y-2">
					<Label htmlFor="shopName">Estabelecimento / Site</Label>
					<Input type="text" id="shopName" {...register('shopName')} />
				</div>

				<div className="space-y-2">
					<Label htmlFor="amount">Valor</Label>
					<PriceInput name="amount" control={control} />
				</div>

				<div className="flex items-center justify-center"></div>

				<Controller
					name="transaction_type"
					control={control}
					defaultValue="DEBIT"
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
									<RadioGroupItem value="CREDIT" id="received" />
									<Label htmlFor="received">Recebido</Label>
								</div>
								<div className="flex items-center gap-2 rounded border bg-red-700 p-4 text-white">
									<RadioGroupItem value="DEBIT" id="sent" />
									<Label htmlFor="sent">Enviado</Label>
								</div>
							</RadioGroup>
						)
					}}
				/>

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
									{resume?.accounts?.map((account) => (
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
					name="category"
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
									<SelectValue placeholder="Selecione a categoria da transação" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="FOOD">Alimentação</SelectItem>
									<SelectItem value="SHOPPING">Compras</SelectItem>
									<SelectItem value="HOME">Moradia</SelectItem>
									<SelectItem value="TRANSPORTATION">Transporte</SelectItem>
									<SelectItem value="ENTERTAINMENT">Entretenimento</SelectItem>
									<SelectItem value="OTHERS">Outros</SelectItem>
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
								<SelectTrigger className="h-8">
									<SelectValue placeholder="Selecione a o método de pagamento" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="MONEY">Dinheiro</SelectItem>
									<SelectItem value="PIX">Pix</SelectItem>
									<SelectItem value="CREDIT_CARD">Cartão de Credito</SelectItem>
									<SelectItem value="DEBIT_CARD">Cartão de Debito</SelectItem>
									<SelectItem value="BANK_TRANSFER">
										Transferência Bancaria
									</SelectItem>
								</SelectContent>
							</Select>
						)
					}}
				/>

				<Controller
					name="created_at"
					control={control}
					render={({ field: { onChange, value } }) => {
						return (
							<div className="flex items-center gap-4">
								<DatePicker
									date={value}
									onDateChange={onChange}
									className="w-full"
								/>
								<Button
									type="button"
									onClick={() => reset({ created_at: undefined })}
								>
									Limpar data
								</Button>
							</div>
						)
					}}
				/>
			</form>

			<DialogFooter className="flex items-center justify-end">
				<DialogClose asChild>
					<Button form="edit-transaction-form" variant="destructive">
						Cancelar
					</Button>
				</DialogClose>

				<Button type="submit" form="edit-transaction-form">
					Salvar
				</Button>
			</DialogFooter>
		</DialogContent>
	)
}
