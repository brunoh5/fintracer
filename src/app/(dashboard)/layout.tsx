import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'

import { Sidebar } from '@/components/sidebar'

import { nextAuthOptions } from '../api/auth/[...nextauth]/options'

export default async function DashboardLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const session = await getServerSession(nextAuthOptions)

	if (!session) {
		redirect('/')
	}

	return (
		<div className="min-h-dvh md:flex" suppressHydrationWarning>
			<Sidebar />

			{children}
		</div>
	)
}
