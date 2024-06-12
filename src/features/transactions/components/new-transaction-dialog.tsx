import { z } from 'zod'

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import { useCreateAccount } from '@/features/accounts/api/use-create-account'
import { useFetchAccounts } from '@/features/accounts/api/use-fetch-accounts'
import {
	formSchema,
	TransactionForm,
} from '@/features/transactions/components/transaction-form'

import { useCreateTransaction } from '../api/use-create-transaction'
import { useNewTransaction } from '../hooks/use-new-transaction'

type FormValues = z.infer<typeof formSchema>

export function NewTransactionDialog() {
	const { isOpen, onClose, accountId } = useNewTransaction()

	const createMutation = useCreateTransaction()

	const accountQuery = useFetchAccounts()
	const accountMutation = useCreateAccount()
	const onCreateAccount = (bank: string) =>
		accountMutation.mutate({
			bank,
		})
	const accountOptions = (accountQuery?.data?.accounts ?? []).map(
		(account) => ({
			label: account.bank,
			value: account.id,
		}),
	)

	const isPending = createMutation.isPending || accountMutation.isPending

	function onSubmit(values: FormValues) {
		createMutation.mutate(
			{
				...values,
				amount: Number(values.amount * 100),
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
					<DialogTitle>Nova Transação</DialogTitle>
				</DialogHeader>
				<TransactionForm
					onSubmit={onSubmit}
					disabled={isPending}
					accountOptions={accountOptions}
					onCreateAccount={onCreateAccount}
					accountId={accountId}
				/>
			</DialogContent>
		</Dialog>
	)
}
