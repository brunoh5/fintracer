'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Plus } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import {
	createTransaction,
	CreateTransactionResponse,
} from '@/app/api/create-transaction'
import { fetchAccounts } from '@/app/api/fetch-accounts'
import {
	AccountProps,
	CategoryTypes,
	PaymentMethods,
	TransactionTypes,
} from '@/types'

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
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from './ui/select'

interface NewTransactionSchemaProps {
	accountId: string | null
}

const newTransactionSchema = z.object({
	name: z.string({
		required_error: 'Please type a name for transaction',
	}),
	accountId: z.any(),
	shopName: z.optional(z.string()),
	amount: z.string(),
	transaction_type: z.enum(['DEBIT', 'CREDIT']),
	payment_method: z
		.enum(['MONEY', 'PIX', 'CREDIT_CARD', 'DEBIT_CARD', 'BANK_TRANSFER'])
		.default('MONEY'),
	category: z
		.enum(['FOOD', 'HOME', 'TRANSPORT', 'OTHERS', 'SHOPPING', 'ENTERTAINMENT'])
		.default('OTHERS'),
})

type NewTransactionSchema = z.infer<typeof newTransactionSchema>

export function NewTransaction({ accountId }: NewTransactionSchemaProps) {
	const queryClient = useQueryClient()

	const {
		register,
		handleSubmit,
		control,
		formState: { isSubmitting },
	} = useForm<NewTransactionSchema>({
		resolver: zodResolver(newTransactionSchema),
		defaultValues: {
			transaction_type: 'DEBIT',
			payment_method: 'MONEY',
		},
	})

	const { data: resume } = useQuery({
		queryKey: ['resume-accounts'],
		queryFn: fetchAccounts,
	})

	const { mutateAsync: createTransactionFn } = useMutation({
		mutationFn: createTransaction,
		onMutate: async ({ amount }) => {
			const cachedAccount = queryClient.getQueryData<AccountProps>([
				'accounts',
				accountId,
			])

			if (cachedAccount) {
				queryClient.setQueryData(['accounts', accountId], {
					...cachedAccount,
					balance:
						cachedAccount.balance +
						Number(amount.replace('R$', '').trim().replace(',', '.')),
				})
			}

			const cached = queryClient.getQueryData<CreateTransactionResponse[]>([
				accountId,
				'transactions',
			])

			return { previousTransactions: cached, previousAccount: cachedAccount }
		},
		onError: (_, __, context) => {
			if (context?.previousTransactions) {
				queryClient.setQueryData(
					[accountId, 'transactions'],
					context?.previousTransactions,
				)
			}

			if (context?.previousAccount) {
				queryClient.setQueryData(
					['accounts', accountId],
					context?.previousAccount,
				)
			}
		},
		onSuccess(data, _, context) {
			if (context?.previousTransactions) {
				queryClient.setQueryData(
					[accountId, 'transactions'],
					[...context.previousTransactions, data],
				)
			}
		},
	})

	async function handleCreateTransaction(data: NewTransactionSchema) {
		try {
			await createTransactionFn({
				name: data.name,
				shopName: data.shopName,
				transaction_type: data.transaction_type as TransactionTypes,
				amount: data.amount,
				accountId: data.accountId,
				payment_method: data.payment_method as PaymentMethods,
				category: data.category as CategoryTypes,
			})

			toast.success('Transação cadastrada com sucesso')
		} catch {
			toast.error('Erro ao cadastrar a transação')
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
					Nova Transação
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Criar transação</DialogTitle>
				</DialogHeader>

				<form
					id="new-transaction-form"
					onSubmit={handleSubmit(handleCreateTransaction)}
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
						<Input id="amount" {...register('amount')} />
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
						defaultValue={accountId}
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
										<SelectItem value="ENTERTAINMENT">
											Entretenimento
										</SelectItem>
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
										<SelectItem value="CREDIT_CARD">
											Cartão de Credito
										</SelectItem>
										<SelectItem value="DEBIT_CARD">Cartão de Debito</SelectItem>
										<SelectItem value="BANK_TRANSFER">
											Transferência Bancaria
										</SelectItem>
									</SelectContent>
								</Select>
							)
						}}
					/>
				</form>

				<DialogFooter className="flex items-center justify-end">
					<DialogClose asChild>
						<Button
							form="new-transaction-form"
							variant="destructive"
							disabled={isSubmitting}
						>
							Cancelar
						</Button>
					</DialogClose>

					<Button
						type="submit"
						form="new-transaction-form"
						disabled={isSubmitting}
					>
						Salvar
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
