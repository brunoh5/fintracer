'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { createAccount, CreateAccountResponse } from '@/app/api/create-account'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
	Dialog,
	DialogClose,
	DialogContent,
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

const newAccountSchema = z.object({
	type: z.enum([
		'CURRENT_ACCOUNT',
		'SAVINGS_ACCOUNT',
		'INVESTMENT_ACCOUNT',
		'MACHINE_ACCOUNT',
	]),
	bank: z.string(),
	number: z.optional(z.string()),
	initialAmount: z.optional(z.coerce.number()),
})

type NewAccountSchema = z.infer<typeof newAccountSchema>

export function NewAccountForm() {
	const queryClient = useQueryClient()

	const {
		register,
		handleSubmit,
		control,
		formState: { isSubmitting },
	} = useForm<NewAccountSchema>({
		resolver: zodResolver(newAccountSchema),
		defaultValues: {
			number: '',
			initialAmount: 0,
			type: 'CURRENT_ACCOUNT',
		},
	})

	function updateBalanceAccountsCache(newData: NewAccountSchema) {
		const cached = queryClient.getQueryData<CreateAccountResponse>([
			'balance',
			'accounts',
		])

		if (cached) {
			queryClient.setQueryData<CreateAccountResponse>(['balance', 'accounts'], {
				...cached,
				...newData,
			})
		}

		return { cached }
	}

	const { mutateAsync: createAccountFn } = useMutation({
		mutationFn: createAccount,
		onMutate: async (newData) => {
			const { cached } = updateBalanceAccountsCache(newData)

			return { previousAccounts: cached }
		},
		onError: (_, __, context) => {
			if (context?.previousAccounts) {
				updateBalanceAccountsCache(context.previousAccounts)
			}
		},
	})

	async function handleCreateAccount({
		type,
		bank,
		number,
		initialAmount,
	}: NewAccountSchema) {
		try {
			await createAccountFn({
				type,
				bank,
				number,
				initialAmount,
			})

			toast.success('Conta cadastrada com sucesso')
		} catch {
			toast.error('Erro ao cadastrar a conta')
		}
	}

	return (
		<Card className="flex h-72 flex-col items-center justify-center rounded-lg px-6 pb-[88px] pt-[100px]">
			<CardContent className="flex flex-col gap-6 sm:w-[208px]">
				<Dialog>
					<DialogTrigger asChild>
						<Button>Crie uma nova conta</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Nova conta</DialogTitle>
						</DialogHeader>

						<form
							id="new-account-form"
							onSubmit={handleSubmit(handleCreateAccount)}
							className="space-y-4"
						>
							<Controller
								name="type"
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
												<SelectValue placeholder="Selecione o tipo da conta" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="CURRENT_ACCOUNT">
													Conta corrente
												</SelectItem>
												{/* <SelectItem value="INVESTMENT_ACCOUNT">
													Conta de investimentos
												</SelectItem>
												<SelectItem value="SAVINGS_ACCOUNT">
													Poupança
												</SelectItem>
												<SelectItem value="MACHINE_ACCOUNT">
													Maquininha de Cartão
												</SelectItem> */}
											</SelectContent>
										</Select>
									)
								}}
							/>

							<div className="space-y-2">
								<Label htmlFor="bank-name">Seu banco</Label>
								<Input
									id="bank-name"
									autoComplete="off"
									{...register('bank')}
									required
								/>
							</div>

							<div className="space-y-2">
								<Label htmlFor="account-number">Numero da conta</Label>
								<Input
									id="account-number"
									autoComplete="off"
									{...register('number')}
								/>
							</div>

							<div className="space-y-2">
								<Label htmlFor="initial-amount">Valor Inicial</Label>
								<Input
									id="initial-amount"
									autoComplete="off"
									defaultValue={0}
									{...register('initialAmount')}
								/>
								<span className="text-xs">
									Caso importe extratos, pode dar diferença no valor final
								</span>
							</div>
						</form>

						<DialogFooter className="flex items-center justify-end">
							<DialogClose asChild>
								<Button
									type="reset"
									form="new-account-form"
									variant="destructive"
								>
									Cancelar
								</Button>
							</DialogClose>

							<Button
								type="submit"
								form="new-account-form"
								disabled={isSubmitting}
							>
								Salvar
							</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>

				{/* <Button variant="secondary" className="w-full px-6 py-3">
					Edit Accounts
				</Button> */}
			</CardContent>
		</Card>
	)
}
