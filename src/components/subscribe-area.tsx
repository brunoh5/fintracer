'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function SubscribeArea() {
	const pathname = usePathname()

	if (pathname === '/overview') {
		return (
			<div className="flex w-full items-center justify-center bg-primary p-2 text-center">
				<p className="mr-2">Seu período de testes termina em 3 dias</p>
				<Link href="/overview/plans">Assine já</Link>
			</div>
		)
	}
}
