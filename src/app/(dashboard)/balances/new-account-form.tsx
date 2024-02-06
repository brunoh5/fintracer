/* eslint-disable n/handle-callback-err */
'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { getSession } from 'next-auth/react'
import { FormEvent, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
// import { DatePicker } from '@/components/ui/date-picker'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import { api } from '@/services/api'
import { AccountProps } from '@/types'

export function NewAccountForm() {
	const [formattedNumber, setFormattedNumber] = useState('')
	const queryClient = useQueryClient()

	const mutation = useMutation({
		mutationKey: ['balance/accounts'],
		mutationFn: async (data: object) => {
			const session = await getSession()

			return api.post('/accounts', data, {
				headers: {
					Authorization: `Bearer ${session?.user}`,
				},
			})
		},
		onMutate: async (newAccount) => {
			await queryClient.cancelQueries({ queryKey: ['balance/accounts'] })

			const previousAccounts = queryClient.getQueryData(['balance/accounts'])

			queryClient.setQueryData(['balance/accounts'], (old: AccountProps[]) => [
				...old,
				newAccount,
			])

			return previousAccounts
		},
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		onError: (err, _, context: any) => {
			queryClient.setQueryData(['balance/accounts'], context.previousAccounts)
			toast({
				variant: 'destructive',
				title: 'Um erro ocorreu',
				description: `${err}`,
			})
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ['balance/accounts'] })
		},
	})

	async function handleCreateAccount(event: FormEvent<HTMLFormElement>) {
		event.preventDefault()

		const formData = new FormData(event.currentTarget)

		const data = {
			type: formData.get('type'),
			bank: formData.get('bank'),
			number: formattedNumber.replace(/\s/g, ''),
			initialAmount: Number(formData.get('initialAmount')) ?? 0,
		}

		mutation.mutate(data)

		setFormattedNumber('')
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
							onSubmit={handleCreateAccount}
							className="flex w-full flex-col items-center gap-4"
						>
							<div>
								<label htmlFor="account-type">Tipo da conta</label>
								<Input id="account-type" name="type" autoComplete="off" />
							</div>

							<div>
								<label htmlFor="bank-name">Banco</label>
								<Input id="bank-name" name="type" autoComplete="off" />
							</div>

							<div>
								<label htmlFor="account-number">Numero da conta</label>
								<Input
									id="account-number"
									name="number"
									autoComplete="off"
									maxLength={16}
								/>
							</div>

							<div>
								<label htmlFor="initial-amount">Valor Inicial</label>
								<Input
									id="initial-amount"
									name="initialAmount"
									autoComplete="off"
									defaultValue={0}
								/>
							</div>

							<div className="flex w-full justify-center">
								<Button className="max-w-[192px]" type="submit">
									Salvar
								</Button>
							</div>
						</form>
					</DialogContent>
				</Dialog>

				{/* <Button variant="secondary" className="w-full px-6 py-3">
					Edit Accounts
				</Button> */}
			</CardContent>
		</Card>
	)
}
