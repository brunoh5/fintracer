'use client'

import {
	ArrowRightLeft,
	LayoutGrid,
	MenuIcon,
	Receipt,
	Settings,
	Wallet,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { useMedia } from 'react-use'

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

import { NavButton } from '../nav-button'
import { Button } from '../ui/button'
import { Profile } from './profile'

const routes = [
	{
		href: '/overview',
		label: 'Dashboard',
		icon: <LayoutGrid className="size-5" />,
	},
	{
		href: '/balances',
		label: 'Contas',
		icon: <Wallet className="size-5" />,
	},
	{
		href: '/transactions',
		label: 'Transações',
		icon: <ArrowRightLeft className="size-5" />,
	},
	{
		href: '/bills',
		label: 'Despesas',
		icon: <Receipt className="size-5" />,
	},
	// {
	// 	href: '/expenses',
	// 	label: 'Gastos',
	// 	icon: <CreditCard className="size-5" />,
	// },
	// {
	// 	href: '/goals',
	// 	label: 'Objetivos',
	// 	icon: <Crosshair className="size-5" />,
	// },
	{
		href: '/settings',
		label: 'Configurações',
		icon: <Settings className="size-5" />,
	},
]

export function Sidebar() {
	const pathname = usePathname()
	const [isSidebarOpen, setIsSidebarOpen] = useState(false)
	const isMobile = useMedia('(max-width: 768px)', false)
	const router = useRouter()

	function onClick(href: string) {
		router.push(href)
		setIsSidebarOpen(false)
	}

	if (isMobile) {
		return (
			<aside className="px-3 py-4">
				<Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
					<div className="flex items-center justify-between lg:justify-center">
						<h1>
							<Link
								href="/overview"
								className="flex items-center justify-center gap-2"
							>
								<Receipt className="size-6" />
								<span className="text-center text-xl font-bold">
									fin.tracer
								</span>
							</Link>
						</h1>
						<SheetTrigger>
							<Button
								variant="ghost"
								size="sm"
								className="border-none bg-white/10 font-normal outline-none hover:bg-white/20 hover:text-white"
							>
								<MenuIcon className="size-4" />
							</Button>
						</SheetTrigger>
					</div>
					<SheetContent className="flex flex-1 flex-col" side="left">
						<nav className="flex flex-col gap-y-2 pt-6">
							{routes.map((route) => (
								<Button
									variant={route.href === pathname ? 'secondary' : 'ghost'}
									key={route.href}
									className="flex items-center justify-start gap-2"
									onClick={() => onClick(route.href)}
								>
									{route.icon}
									{route.label}
								</Button>
							))}
						</nav>

						<Profile />
					</SheetContent>
				</Sheet>
			</aside>
		)
	}

	return (
		<aside className="fixed flex h-screen flex-col gap-6 bg-card md:right-auto md:w-56 md:border-r md:border-r-muted md:px-7 md:py-12">
			<h1>
				<Link href="/overview" className="flex items-center justify-center">
					<Receipt className="mr-4 size-6" />
					<span className="text-center text-xl font-bold">fin.tracer</span>
				</Link>
			</h1>
			<nav className="flex flex-col gap-4">
				{routes.map((route) => (
					<NavButton
						key={route.href}
						href={route.href}
						isActive={pathname === route.href}
						onClick={() => setIsSidebarOpen(false)}
					>
						{route.icon}
						{route.label}
					</NavButton>
				))}
			</nav>
		</aside>
	)
}
