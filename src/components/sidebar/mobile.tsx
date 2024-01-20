import { ArrowRightLeft, LayoutGrid, Menu, Wallet } from 'lucide-react'

import { LogoutButton } from '../logout-button'
import { NavLink } from '../nav-link'
import { ThemeSwitch } from '../theme-switch'
import { Button } from '../ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '../ui/dropdown-menu'

export function Mobile() {
	return (
		<div className="sm:hidden">
			<DropdownMenu>
				<DropdownMenuTrigger
					className="pb-5 pl-6 pr-8 pt-5 outline-none"
					asChild
				>
					<Button className="w-full rounded-none bg-primary">
						<Menu />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="bg-background">
					<DropdownMenuLabel>
						Fin
						<span className="font-normal lowercase">tracer</span>
					</DropdownMenuLabel>
					<DropdownMenuSeparator />

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

						<div className="flex items-center gap-2">
							<LogoutButton />
							<ThemeSwitch />
						</div>
					</nav>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	)
}
