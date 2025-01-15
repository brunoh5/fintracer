import { Loader2 } from 'lucide-react'
import type { z } from 'zod'

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import { useCreateAccount } from '@/features/accounts/api/use-create-account'
import { useFetchAccounts } from '@/features/accounts/api/use-fetch-accounts'

import { useEditTransaction } from '../api/use-edit-transaction'
import { useGetTransaction } from '../api/use-get-transaction'
import { useOpenTransaction } from '../hooks/use-open-transaction'
import { TransactionForm, type formSchema } from './transaction-form'

type FormValues = z.infer<typeof formSchema>

export function EditTransactionDialog() {
	const { isOpen, onClose, id } = useOpenTransaction()

	const accountQuery = useFetchAccounts()
	const accountMutation = useCreateAccount()
	const onCreateAccount = (bank: string) =>
		accountMutation.mutate({
			bank,
		})
	const accountOptions = (accountQuery?.data?.accounts ?? []).map(account => ({
		label: account.bank,
		value: account.id,
	}))

	const { data: transactionResponse, isLoading } = useGetTransaction(id)
	const editMutation = useEditTransaction(id)

	const isPending = editMutation.isPending

	function onSubmit(values: FormValues) {
		editMutation.mutate(
			{ ...values, amount: Number(values.amount.replace(',', '.')) * 100 },
			{
				onSuccess: () => {
					onClose()
				},
			}
		)
	}

	const defaultValues: FormValues = transactionResponse?.transaction
		? {
				accountId: transactionResponse.transaction.accountId,
				amount: String(transactionResponse.transaction.amountInCents / 100),
				category: transactionResponse.transaction.category,
				name: transactionResponse.transaction.name,
				payment_method: transactionResponse.transaction.payment_method,
				transaction_type: transactionResponse.transaction.transaction_type,
				date: new Date(transactionResponse.transaction.date),
			}
		: {
				accountId: '',
				amount: '',
				category: 'OTHERS',
				name: '',
				payment_method: 'MONEY',
			}

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Editar Transação</DialogTitle>
				</DialogHeader>
				{isLoading ? (
					<div className="absolute inset-0 flex items-center justify-center">
						<Loader2 className="size-4 animate-spin" />
					</div>
				) : (
					<TransactionForm
						id={id}
						onSubmit={onSubmit}
						disabled={isPending}
						defaultValues={defaultValues}
						accountOptions={accountOptions}
						onCreateAccount={onCreateAccount}
					/>
				)}
			</DialogContent>
		</Dialog>
	)
}
