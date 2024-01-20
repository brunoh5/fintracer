/* eslint-disable n/handle-callback-err */
'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { X } from 'lucide-react'
import { getSession } from 'next-auth/react'
import { FormEvent, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import { api } from '@/services/api'
import { AccountProps } from '@/types'

export function NewAccountForm() {
	const [isOpen, setIsOpen] = useState(false)
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

		setIsOpen(false)
		setFormattedNumber('')
	}

	return (
		<Card className="flex h-72 flex-col items-center rounded-lg px-6 pb-[88px] pt-[100px]">
			<CardContent className="flex flex-col gap-6 sm:w-[208px]">
				<Button onClick={() => setIsOpen(true)}>Add Accounts</Button>
				<Button variant="secondary" className="px-6 py-3">
					Edit Accounts
				</Button>
			</CardContent>

			<div
				className="absolute bottom-0 left-0 right-0 top-0 z-10 hidden items-center justify-center bg-gray-950/20 transition-all data-[active=true]:flex"
				role="dialog"
				aria-modal="true"
				data-active={isOpen === true}
			>
				{/* Mudar para Dialog */}
				<div className="relative w-full max-w-[488px] rounded-2xl bg-white px-16 pb-12 pt-16">
					<button
						className="group absolute right-8 top-8"
						onClick={() => setIsOpen(false)}
					>
						<X
							size={32}
							className="text-gray-900 transition-colors group-hover:text-chili-red"
						/>
					</button>

					<form
						onSubmit={handleCreateAccount}
						className="flex w-full flex-col items-center gap-8"
					>
						<div>
							<label htmlFor="account-type">Account Type</label>
							<Input id="account-type" name="type" autoComplete="off" />
						</div>

						<div>
							<label htmlFor="bank-name">Bank</label>
							<Input id="bank-name" name="type" autoComplete="off" />
						</div>

						<div>
							<label htmlFor="account-number">Account Number</label>
							<Input
								id="account-number"
								name="number"
								autoComplete="off"
								maxLength={16}
							/>
						</div>

						<div>
							<label htmlFor="initial-amount">Initial Amount</label>
							<Input
								id="initial-amount"
								name="initialAmount"
								autoComplete="off"
								defaultValue={0}
							/>
						</div>

						<div className="flex w-full justify-center">
							<Button className="max-w-[192px]" type="submit">
								Save
							</Button>
						</div>
					</form>
				</div>
			</div>
		</Card>
	)
}
