import Link from 'next/link'

import { AccountList } from './account-list'
import { Balance } from './balance'

export async function TotalBalance() {
	return (
		<div className="w-full">
			<h2 className="mb-2 text-[22px] text-gray-500">Balanço Geral</h2>
			<div className="flex h-[232px] w-full flex-col gap-3 rounded-lg bg-white px-6 py-5">
				<div className="flex items-center justify-between border-b border-[#F3F3F3] pb-3">
					<Balance />
					<Link href="/balances" className="text-xs text-gray-900">
						Todas as contas
					</Link>
				</div>

				<AccountList />
			</div>
		</div>
	)
}
