'use client'

import { useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { ChevronsRight, UserCircleIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

import { getProfile } from '@/api/get-profile'
import { signOut } from '@/app/api/sign-out'

import { ThemeSwitch } from './theme-switch'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Skeleton } from './ui/skeleton'

export function Header() {
	const pathname = usePathname()

	const { data: userData, isLoading } = useQuery({
		queryKey: ['profile'],
		queryFn: getProfile,
		staleTime: Number.POSITIVE_INFINITY,
	})

	const isOverviewVisible = pathname === '/overview'

	const { replace } = useRouter()

	const logOutMutation = signOut()

	async function handleLogout() {
		logOutMutation.mutate(undefined, {
			onSuccess: () => {
				replace('/')
			},
		})
	}

	return (
		<header className="flex h-16 items-center justify-between pb-5 pt-2">
			<div
				className={`${isOverviewVisible ? 'hidden' : 'flex'} items-center justify-center gap-2 text-muted-foreground lg:flex`}
			>
				<ChevronsRight />
				<span className="text-nowrap">
					{format(new Date(), 'dd MMM, yyyy', {
						locale: ptBR,
					})}
				</span>
			</div>
			<DropdownMenu>
				<DropdownMenuTrigger className="outline-none">
					<UserCircleIcon className="size-8" />
				</DropdownMenuTrigger>
				<DropdownMenuContent
					align="end"
					className="w-[240px] rounded-none p-0.5"
					sideOffset={10}
				>
					<DropdownMenuLabel>
						{isLoading ? (
							<div className="space-y-2">
								<Skeleton className="h-4 w-14" />
								<Skeleton className="h-4 w-36" />
							</div>
						) : (
							<>
								{userData && (
									<div className="space-y-2">
										<p className="truncate text-sm font-bold">
											{userData.name}
										</p>
										<p className="truncate text-xs text-muted-foreground">
											{userData.email}
										</p>
									</div>
								)}
							</>
						)}
					</DropdownMenuLabel>

					<DropdownMenuGroup>
						<Link href="/settings" prefetch>
							<DropdownMenuItem className="rounded-none">
								Conta
							</DropdownMenuItem>
						</Link>
					</DropdownMenuGroup>

					<DropdownMenuSeparator />
					<div className="flex items-center justify-between p-2">
						<p className="text-sm">Theme</p>
						<ThemeSwitch />
					</div>
					<DropdownMenuSeparator />

					<DropdownMenuItem
						onClick={handleLogout}
						className="rounded-none"
						aria-label="logout button"
					>
						Deslogar
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</header>
	)
}
