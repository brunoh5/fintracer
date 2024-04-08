'use client'

import Link, { LinkProps } from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

export interface NavLinkProps extends LinkProps {
	children: ReactNode
	className?: string
}

export function NavLink({ className, ...props }: NavLinkProps) {
	const pathname = usePathname()

	return (
		<Link
			data-current={pathname === props.href}
			className={twMerge(
				'flex items-center gap-2 rounded px-3 py-2 text-muted-foreground transition-colors hover:bg-white/[0.08]',
				'data-[current=true]:bg-primary data-[current=true]:text-white',
				className,
			)}
			{...props}
		>
			{props.children}
		</Link>
	)
}
