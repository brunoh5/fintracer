import { Header } from '@/components/header'
import { Suspense } from 'react'
import { AccountList } from './accounts-list'
import { AccountListSkeleton } from '../overview/total-balance/account-list-skeleton'
import { NewAccountForm } from './new-account-form'

export default function Balances() {
	return (
		<div className="flex-1 w-screen flex-col ml-[280px]">
			<Header />

			<main className="relative flex flex-col gap-4 pb-8 pl-6 pr-8 pt-4">
				<h2 className="text-[22px] text-gray-500">Contas</h2>

				<div className="grid h-screen w-full grid-cols-3 grid-rows-[288px] gap-x-6 gap-y-8">
					{/* <AccountList /> */}
					<Suspense fallback={<AccountListSkeleton />}>
						<AccountList />
					</Suspense>

					<NewAccountForm />
				</div>
			</main>
		</div>
	)
}
