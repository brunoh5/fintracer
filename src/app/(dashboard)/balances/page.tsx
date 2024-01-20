import { Header } from '@/components/header'

import { AccountList } from './accounts-list'
import { NewAccountForm } from './new-account-form'

export default function Balances() {
	return (
		<div className="w-screen flex-1 flex-col sm:ml-[280px]">
			<Header />

			<main className="relative flex flex-col gap-4 pb-8 pl-6 pr-8 pt-4">
				<h2 className="text-[22px] text-muted-foreground">Contas</h2>

				<div className="grid w-full grid-cols-1 gap-y-8 sm:grid-cols-3 sm:grid-rows-[288px] sm:gap-x-6">
					<AccountList />

					<NewAccountForm />
				</div>
			</main>
		</div>
	)
}
