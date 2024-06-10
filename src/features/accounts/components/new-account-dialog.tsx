import { z } from 'zod'

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import { AccountForm } from '@/features/accounts/components/account-form'

import { useCreateAccount } from '../api/use-create-account'
import { useNewAccount } from '../hooks/use-new-account'

const formSchema = z.object({
	type: z
		.enum([
			'CURRENT_ACCOUNT',
			'SAVINGS_ACCOUNT',
			'INVESTMENT_ACCOUNT',
			'MACHINE_ACCOUNT',
		])
		.default('CURRENT_ACCOUNT'),
	bank: z.string(),
	number: z.string().optional(),
	initialAmount: z.coerce.number().optional(),
})

type FormValues = z.infer<typeof formSchema>

export function NewAccountDialog() {
	const { isOpen, onClose } = useNewAccount()

	const { mutate, isPending } = useCreateAccount()

	function onSubmit(values: FormValues) {
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
