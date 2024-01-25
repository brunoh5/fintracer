import { ArrowRightLeft, LayoutGrid, Wallet } from 'lucide-react'

import { LogoutButton } from '../logout-button'
import { NavLink } from '../nav-link'
import { Mobile } from './mobile'
import { Profile } from './profile'

export function Sidebar() {
	return (
		<>
			<Mobile />

			<aside className="fixed left-0 top-0 z-40 flex h-screen w-[280px] -translate-x-full flex-col justify-between border-r border-r-muted px-7 py-12 font-semibold text-card-foreground transition-transform sm:translate-x-0 dark:bg-card">
				<div className="flex h-full flex-col justify-between">
					<div>
						<h1 className="mb-6 text-center text-xl font-bold">Fintracer</h1>

						<nav className="flex flex-col gap-4">
							<NavLink href="/overview">
								<LayoutGrid />
								Dashboard
							</NavLink>
							<NavLink href="/balances">
								<Wallet />
								Contas
							</NavLink>
							<NavLink href="/transactions">
								<ArrowRightLeft />
								Transações
							</NavLink>
							{/* <NavLink href="/bills">
								<Receipt />
								Despesas
							</NavLink> */}
							{/* <NavLink href="/expenses">
								<CreditCard />
								Gastos
							</NavLink> */}
							{/* <NavLink href="/goals">
								<Crosshair />
								Objetivos
							</NavLink> */}
							{/* <NavLink href="/settings/account">
								<Settings />
								Configurações
							</NavLink> */}
						</nav>
					</div>

					<LogoutButton />
				</div>

				<div className="mt-4 flex flex-col divide-y">
					<Profile />
				</div>
			</aside>
		</>
	)
}
