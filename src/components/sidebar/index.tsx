'use client'

import {
	ArrowRightLeft,
	LayoutGrid,
	Menu,
	Receipt,
	Settings,
	Wallet,
} from 'lucide-react'
import { twMerge } from 'tailwind-merge'

import { LogoutButton } from '../logout-button'
import { NavLink } from '../nav-link'
import { Button } from '../ui/button'
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from '../ui/collapsible'
import { Profile } from './profile'

export function Sidebar() {
	return (
		<Collapsible
			className={twMerge(
				'fixed left-0 right-0 top-0 z-20 flex flex-col gap-6 px-3 py-4 font-semibold text-card-foreground data-[state=open]:bottom-0 data-[state=open]:h-screen lg:px-7 lg:py-12',
				'lg:right-auto lg:w-72 lg:border-r lg:border-r-muted lg:data-[state=closed]:bottom-0',
				'dark:bg-card',
			)}
		>
			<div className="flex items-center justify-between lg:justify-center">
				<h1 className="flex items-center justify-center text-center text-xl font-bold">
					<Receipt className="mr-4 size-6" />
					fin.tracer
				</h1>
				<CollapsibleTrigger asChild className="lg:hidden">
					<Button variant="ghost">
						<Menu className="size-6" />
					</Button>
				</CollapsibleTrigger>
			</div>

			<CollapsibleContent
				forceMount
				className="flex flex-1 flex-col gap-6 data-[state=closed]:hidden lg:data-[state=closed]:flex"
			>
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
					<NavLink href="/settings">
						<Settings />
						Configurações
					</NavLink>
				</nav>

				<LogoutButton />

				<Profile />
			</CollapsibleContent>
		</Collapsible>
	)
}
