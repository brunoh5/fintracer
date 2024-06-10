import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { z } from 'zod'

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import { useEditAccount } from '@/features/accounts/api/use-edit-account'
import { useGetAccount } from '@/features/accounts/api/use-get-account'
import { AccountForm } from '@/features/accounts/components/account-form'
import { useOpenAccount } from '@/features/accounts/hooks/use-open-account'

import { useDeleteAccount } from '../api/use-delete-account'

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

export function EditAccountDialog() {
	const router = useRouter()
	const { isOpen, onClose, id } = useOpenAccount()

	const { data: accountResponse, isLoading } = useGetAccount(id)
	const editMutation = useEditAccount(id)
	const deleteMutation = useDeleteAccount(id)

	const isPending = editMutation.isPending || deleteMutation.isPending

	function onSubmit(values: FormValues) {
		editMutation.mutate(values, {
			onSuccess: () => {
				onClose()
			},
		})
	}

	const defaultValues: FormValues = accountResponse?.account
		? {
				bank: accountResponse.account.bank,
				type: accountResponse.account.type,
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
