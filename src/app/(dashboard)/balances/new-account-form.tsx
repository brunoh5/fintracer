/* eslint-disable n/handle-callback-err */
'use client'

import { X } from 'lucide-react'
import { FormEvent, useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { getSession } from 'next-auth/react'

import { api } from '@/services/api'
import { formatAccountNumber } from '@/utils/format-account-number'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
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
		<div className="flex h-72 flex-col items-center rounded-lg bg-white px-6 pb-[88px] pt-[100px]">
			<div className="w-[208px]">
				<Button onClick={() => setIsOpen(true)}>Add Accounts</Button>
				<button className="px-6 py-3">Edit Accounts</button>
			</div>

			<div
				className="z-10 absolute hidden bg-gray-950/20 bottom-0 left-0 right-0 top-0 items-center justify-center transition-all data-[active=true]:flex"
				role="dialog"
				aria-modal="true"
				data-active={isOpen === true}
			>
				<div className="relative rounded-2xl bg-white px-16 pt-16 pb-12 w-full max-w-[488px]">
					<button
						className="absolute top-8 right-8 group"
						onClick={() => setIsOpen(false)}
					>
						<X
							size={32}
							className="text-gray-900 group-hover:text-chili-red transition-colors"
						/>
					</button>

					<form
						onSubmit={handleCreateAccount}
						className="gap-8 flex flex-col items-center w-full"
					>
						<Input.Root>
							<Input.Label name="type" text="Account Type" />
							<Input.Wrapper>
								<Input.Content name="type" autoComplete="off" />
							</Input.Wrapper>
						</Input.Root>

						<Input.Root>
							<Input.Label name="bank" text="Bank" />
							<Input.Wrapper>
								<Input.Content name="bank" autoComplete="off" />
							</Input.Wrapper>
						</Input.Root>

						<Input.Root>
							<Input.Label name="number" text="Account Number" />
							<Input.Wrapper>
								<Input.Content
									name="number"
									autoComplete="off"
									value={formattedNumber}
									onChange={(e) =>
										setFormattedNumber(formatAccountNumber(e.target.value))
									}
									maxLength={16}
									defaultValue={''}
								/>
							</Input.Wrapper>
						</Input.Root>

						<Input.Root>
							<Input.Label name="initialAmount" text="Initial Amount" />
							<Input.Wrapper>
								<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 pr-9">
									<span className="text-gray-500 sm:text-sm">R$</span>
								</div>
								<Input.Content
									type="number"
									name="initialAmount"
									autoComplete="off"
									value={0}
									defaultValue={0}
								/>
							</Input.Wrapper>
						</Input.Root>

						<div className="flex justify-center w-full">
							<Button className="max-w-[192px]" type="submit">
								Save
							</Button>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}
