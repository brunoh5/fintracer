/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable n/handle-callback-err */
'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { getSession } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { createAccount } from '@/app/api/create-account'
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
import { AccountProps } from '@/types'

const newAccountForm = z.object({
	type: z.string(),
	bank: z.string(),
	number: z.string().default(''),
	initialAmount: z.coerce.number().default(0),
})

type NewAccountForm = z.infer<typeof newAccountForm>

export function NewAccountForm() {
	const queryClient = useQueryClient()

	const { register, handleSubmit } = useForm<NewAccountForm>({
		resolver: zodResolver(newAccountForm),
	})

	const { mutateAsync: createAccountFn } = useMutation({
		mutationKey: ['balance', 'accounts'],
		mutationFn: createAccount,
		onMutate: async (newData) => {
			await queryClient.cancelQueries({ queryKey: ['balance', 'accounts'] })

			const previousAccounts = queryClient.getQueryData(['balance', 'accounts'])

			queryClient.setQueryData(
				['balance', 'accounts'],
				(old: AccountProps[]) => [...old, newData],
			)

			return previousAccounts
		},
		onError: (_, __, context: any) => {
			queryClient.setQueryData(
				['balance', 'accounts'],
				context.previousAccounts,
			)
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ['balance', 'accounts'] })
		},
	})

	async function handleCreateAccount(data: NewAccountForm) {
		const session = await getSession()

		try {
			await createAccountFn({
				session,
				data,
			})

			toast.success('Conta cadastrada com sucesso')
		} catch {
			toast.error('Erro ao cadastrar a transação')
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
							className="flex w-full flex-col items-center gap-4"
						>
							<div>
								<Label htmlFor="account-type">Tipo da conta</Label>
								<Input
									id="account-type"
									autoComplete="off"
									{...register('type')}
								/>
							</div>

							<div>
								<Label htmlFor="bank-name">Banco</Label>
								<Input
									id="bank-name"
									autoComplete="off"
									{...register('bank')}
									required
								/>
							</div>

							<div>
								<Label htmlFor="account-number">Numero da conta</Label>
								<Input
									id="account-number"
									autoComplete="off"
									{...register('number')}
								/>
							</div>

							<div>
								<Label htmlFor="initial-amount">Valor Inicial</Label>
								<Input
									id="initial-amount"
									autoComplete="off"
									defaultValue={0}
									{...register('initialAmount')}
								/>
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

							<Button type="submit" form="new-account-form">
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
