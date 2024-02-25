import { Metadata } from 'next'

import { NewAccountForm } from '@/components/new-account-form'

import { AccountList } from './accounts-list'

export const metadata: Metadata = {
	title: 'Gerenciamento',
}

export default function Balances() {
	return (
		<main className="relative flex flex-col gap-4 pb-8 pl-6 pr-8 pt-4">
			<h2 className="text-[22px] text-muted-foreground">Contas</h2>

			<div className="grid w-full grid-cols-1 gap-y-8 sm:grid-cols-3 sm:grid-rows-[288px] sm:gap-x-6">
				<AccountList />

				<NewAccountForm />
			</div>
		</main>
	)
}
