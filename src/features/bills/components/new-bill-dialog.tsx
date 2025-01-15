import type { z } from 'zod'

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import { useCreateBill } from '@/features/bills/api/use-create-bill'
import {
	BillForm,
	type formSchema,
} from '@/features/bills/components/bill-form'
import { useNewBill } from '@/features/bills/hooks/use-new-bill'

type FormValues = z.infer<typeof formSchema>

export function NewBillDialog() {
	const { isOpen, onClose } = useNewBill()

	const { mutate, isPending } = useCreateBill()

	function onSubmit(values: FormValues) {
		mutate(
			{
				...values,
				amount: Number(values.amount),
			},
			{
				onSuccess: () => {
					onClose()
				},
			}
		)
	}

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Nova Despesas</DialogTitle>
				</DialogHeader>
				<BillForm
					onSubmit={onSubmit}
					disabled={isPending}
					defaultValues={{
						title: '',
						amount: '0',
						dueDate: new Date(),
						period: 'only',
					}}
				/>
			</DialogContent>
		</Dialog>
	)
}
