import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import { useEditAccount } from '@/features/accounts/api/use-edit-account'
import {
	AccountForm,
	type AccountFormValues,
} from '@/features/accounts/components/account-form'
import { useOpenAccount } from '@/features/accounts/hooks/use-open-account'

import { useDeleteAccount } from '../api/use-delete-account'
import { useGetAccount } from '../api/use-get-account'

export function EditAccountDialog() {
	const router = useRouter()
	const { isOpen, onClose, id } = useOpenAccount()

	const accountQuery = useGetAccount(id)
	const editMutation = useEditAccount(id)
	const deleteMutation = useDeleteAccount(id)

	const isPending = editMutation.isPending || deleteMutation.isPending
	const isLoading = accountQuery.isLoading

	function onSubmit(values: AccountFormValues) {
		editMutation.mutate(values, {
			onSuccess: () => {
				onClose()
			},
		})
	}

	const defaultValues: AccountFormValues = accountQuery.data?.account
		? {
				bank: accountQuery.data.account.bank,
				type: accountQuery.data.account.type,
			}
		: {
				bank: '',
				type: 'CURRENT_ACCOUNT',
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
					<AccountForm
						id={id}
						onSubmit={onSubmit}
						disabled={isPending}
						defaultValues={defaultValues}
						onDelete={() =>
							deleteMutation.mutate(undefined, {
								onSuccess: () => {
									onClose()
									router.push('/balances')
								},
							})
						}
					/>
				)}
			</DialogContent>
		</Dialog>
	)
}
