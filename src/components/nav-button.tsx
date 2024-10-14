import Link from 'next/link'
import type { ComponentProps } from 'react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface Props extends ComponentProps<'button'> {
	href: string
	isActive?: boolean
}

export function NavButton({ href, isActive, children }: Props) {
	return (
		<Button
			asChild
			size="lg"
			variant="ghost"
			className={cn(
				'flex w-full justify-start gap-2 rounded px-3 py-2 font-normal text-muted-foreground transition-colors hover:bg-white/[0.08] lg:w-auto',
				isActive ? 'bg-primary text-white' : '',
			)}
		>
			<Link href={href}>{children}</Link>
		</Button>
	)
}
