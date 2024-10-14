import { Loader2 } from 'lucide-react'
import type { z } from 'zod'

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import { useFetchAccounts } from '@/features/accounts/api/use-fetch-accounts'
import { useOpenAccount } from '@/features/accounts/hooks/use-open-account'

import { usePayBill } from '../api/use-pay-bill'
import { type formSchema, PayBillForm } from './pay-bill-form'

type FormValues = z.infer<typeof formSchema>

export function PayBillDialog() {
	const { isOpen, onClose, id } = useOpenAccount()

	const accountQuery = useFetchAccounts()
	const accountOptions = (accountQuery?.data?.accounts ?? []).map(
		(account) => ({
			label: account.bank,
			value: account.id,
		}),
	)

	const payMutation = usePayBill()

	const isLoading = accountQuery.isLoading
	const isPending = payMutation.isPending

	function onSubmit(values: FormValues) {
		payMutation.mutate(
			{
				...values,
				paid_amount: Number(values.paid_amount),
			},
			{
				onSuccess: () => {
					onClose()
				},
			},
		)
	}

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Pagar despesa</DialogTitle>
				</DialogHeader>
				{isLoading ? (
					<div className="absolute inset-0 flex items-center justify-center">
						<Loader2 className="size-4 animate-spin" />
					</div>
				) : (
					<PayBillForm
						id={id}
						accountOptions={accountOptions}
						onSubmit={onSubmit}
						disabled={isPending}
					/>
				)}
			</DialogContent>
		</Dialog>
	)
}
