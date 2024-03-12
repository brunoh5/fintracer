'use client'

import { useQuery } from '@tanstack/react-query'
import { redirect, usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'

import { Header } from '@/components/header'
// import { Price } from '@/components/price'
import { Sidebar } from '@/components/sidebar'

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const pathname = usePathname()
	const { status } = useSession()

	if (status === 'unauthenticated') {
		redirect('/')
	}

	return (
		<div className="min-h-screen lg:grid lg:grid-cols-app">
			<Sidebar />

			{/* {pathname === '/overview' && <Price />} */}

			<div
				className={`max-w-screen pt-20 lg:col-start-2 lg:pt-0 ${pathname === '/overview' && 'mt-4'}`}
			>
				<Header />

				{children}
			</div>
		</div>
	)
}
