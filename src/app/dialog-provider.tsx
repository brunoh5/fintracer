'use client'

import { useMountedState } from 'react-use'

import { EditAccountDialog } from '@/features/accounts/components/edit-account-dialog'
import { NewAccountDialog } from '@/features/accounts/components/new-account-dialog'
import { NewBillDialog } from '@/features/bills/components/new-bill-dialog'
import { PayBillDialog } from '@/features/bills/components/pay-bill-dialog'
import { EditTransactionDialog } from '@/features/transactions/components/edit-transaction-dialog'
import { NewTransactionDialog } from '@/features/transactions/components/new-transaction-dialog'

export function DialogProvider() {
	const isMounted = useMountedState()

	if (!isMounted) return null

	return (
		<>
			<NewAccountDialog />
			<EditAccountDialog />

			<NewTransactionDialog />
			<EditTransactionDialog />

			<NewBillDialog />
			<PayBillDialog />
		</>
	)
}
