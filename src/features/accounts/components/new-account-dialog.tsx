import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import {
	AccountForm,
	type AccountFormValues,
} from '@/features/accounts/components/account-form'

import { useCreateAccount } from '../api/use-create-account'
import { useNewAccount } from '../hooks/use-new-account'

export function NewAccountDialog() {
	const { isOpen, onClose } = useNewAccount()

	const { mutate, isPending } = useCreateAccount()

	function onSubmit(values: AccountFormValues) {
		mutate(values, {
			onSuccess: () => {
				onClose()
			},
		})
	}

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Nova Conta</DialogTitle>
				</DialogHeader>
				<AccountForm
					onSubmit={onSubmit}
					disabled={isPending}
					defaultValues={{
						bank: '',
						type: 'CURRENT_ACCOUNT',
					}}
				/>
			</DialogContent>
		</Dialog>
	)
}
