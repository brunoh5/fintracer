import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth/next'

import { Header } from '@/components/header'
import { Sidebar } from '@/components/sidebar'
// import { SubscribeArea } from '@/components/subscribe-area'
import { BillsContextProvider } from '@/contexts/BillsContext'

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

	return (
		<div className="min-h-screen gap-6 lg:grid lg:grid-cols-app">
			<Sidebar />

			<div className="max-w-screen lg:col-start-2 lg:pt-0">
				{/* <SubscribeArea /> */}

				<Header />

				<BillsContextProvider>{children}</BillsContextProvider>
			</div>
		</div>
	)
}
