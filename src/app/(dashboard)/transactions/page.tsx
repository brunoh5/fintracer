import type { Metadata } from 'next'

import { Suspense } from 'react'
import { TransactionsList } from './transactions-list'

export const metadata: Metadata = {
	title: 'Transações',
}

export default async function Transactions() {
	return (
		<main className="mb-8">
			<Suspense>
				<TransactionsList />
			</Suspense>
		</main>
	)
}
