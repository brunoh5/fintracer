import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth/next'

import { Header } from '@/components/header'
import { Sidebar } from '@/components/sidebar'

import { nextAuthOptions } from '../api/auth/[...nextauth]/options'

export default async function DashboardLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const session = await getServerSession(nextAuthOptions)

	if (session === null) {
		redirect('/')
	}
	// const { status } = useSession()

	// if (status === 'unauthenticated') {
	// 	redirect('/')
	// }

	return (
		<div className="min-h-screen lg:grid lg:grid-cols-app">
			<Sidebar />

			<div className={`max-w-screen pt-20 lg:col-start-2 lg:pt-0`}>
				<Header />

				{children}
			</div>
		</div>
	)
}
