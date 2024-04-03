'use client'

import {
	ArrowRightLeft,
	LayoutGrid,
	Menu,
	Receipt,
	Settings,
	Wallet,
} from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
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
	const [isSidebarOpen, setIsSidebarOpen] = useState(false)

	return (
		<Collapsible
			open={isSidebarOpen}
			onOpenChange={setIsSidebarOpen}
			className={twMerge(
				'fixed left-0 right-0 top-0 z-20 flex flex-col gap-6 px-3 py-4 font-semibold text-card-foreground data-[state=open]:bottom-0 data-[state=open]:h-screen lg:px-7 lg:py-12',
				'lg:right-auto lg:w-56 lg:border-r lg:border-r-muted lg:data-[state=closed]:bottom-0',
				'bg-card dark:bg-card',
			)}
		>
			<div className="flex items-center justify-between lg:justify-center">
				<h1>
					<Link href="/overview" className="flex items-center justify-center">
						<Receipt className="mr-4 size-6" />
						<span className="text-center text-xl font-bold">fin.tracer</span>
					</Link>
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
					<NavLink href="/overview" onClick={() => setIsSidebarOpen(false)}>
						<LayoutGrid className="size-5" />
						Dashboard
					</NavLink>
					<NavLink href="/balances" onClick={() => setIsSidebarOpen(false)}>
						<Wallet className="size-5" />
						Contas
					</NavLink>
					<NavLink href="/transactions" onClick={() => setIsSidebarOpen(false)}>
						<ArrowRightLeft className="size-5" />
						Transações
					</NavLink>
					{/* <NavLink href="/bills" onClick={() => setIsSidebarOpen(false)}>
								<Receipt className="size-5"/>
								Despesas
							</NavLink> */}
					{/* <NavLink href="/expenses">
								<CreditCard className="size-5"/>
								Gastos
							</NavLink> */}
					{/* <NavLink href="/goals">
								<Crosshair className="size-5"/>
								Objetivos
							</NavLink> */}
					<NavLink href="/settings" onClick={() => setIsSidebarOpen(false)}>
						<Settings className="size-5" />
						Configurações
					</NavLink>
				</nav>

				<LogoutButton />

				<Profile />
			</CollapsibleContent>
		</Collapsible>
	)
}
