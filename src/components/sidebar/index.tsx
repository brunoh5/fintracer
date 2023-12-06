import {
	ArrowRightLeft,
	CreditCard,
	Crosshair,
	LayoutGrid,
	Receipt,
	Settings,
	Wallet,
} from 'lucide-react'

import { Navigation } from '../ui/Navigation'
import { LogoutButton } from '../ui/logout-button'
import { Profile } from './profile'

export function Sidebar() {
	return (
		<aside
			className="flex min-h-screen w-full max-w-[280px] flex-col justify-between bg-eerie-black-900 px-7 py-12 font-semibold"
			suppressHydrationWarning
		>
			<div>
				<h1 className="mb-6 w-full text-center text-xl text-zinc-50 uppercase">
					Fin
					<span className="lowercase font-normal">track.</span>
					IO
				</h1>

				<nav className="flex flex-col gap-4">
					<Navigation.Root href="/overview" shouldMatchExactHref={true}>
						<Navigation.Icon icon={LayoutGrid} />
						Dashboard
					</Navigation.Root>
					<Navigation.Root href="/balances" shouldMatchExactHref={true}>
						<Navigation.Icon icon={Wallet} />
						Contas
					</Navigation.Root>
					<Navigation.Root href="/transactions" shouldMatchExactHref={true}>
						<Navigation.Icon icon={ArrowRightLeft} />
						Transações
					</Navigation.Root>
					<Navigation.Root href="/bills" shouldMatchExactHref={true}>
						<Navigation.Icon icon={Receipt} />
						Despesas
					</Navigation.Root>
					<Navigation.Root href="/expenses" shouldMatchExactHref={true}>
						<Navigation.Icon icon={CreditCard} />
						Gastos
					</Navigation.Root>
					<Navigation.Root href="/goals" shouldMatchExactHref={true}>
						<Navigation.Icon icon={Crosshair} />
						Objetivos
					</Navigation.Root>
					<Navigation.Root href="/settings/account">
						<Navigation.Icon icon={Settings} />
						Configurações
					</Navigation.Root>
				</nav>

				<LogoutButton />
			</div>

			<div className="mt-4 flex flex-col gap-11 divide-y">
				<Profile />
			</div>
		</aside>
	)
}
