// import { redirect } from 'next/navigation'
// import { getServerSession } from 'next-auth'

// import { nextAuthOptions } from '../api/auth/[...nextauth]/options'
import { Header } from '@/components/header'
import { Sidebar } from '@/components/sidebar'

export default async function DashboardLayout({
	children,
}: {
	children: React.ReactNode
}) {
	// const session = await getServerSession(nextAuthOptions)

	// if (!session) {
	// 	redirect('/')
	// }

	return (
		<div className="min-h-screen lg:grid lg:grid-cols-app">
			<Sidebar />

			<div className="max-w-screen pt-20 lg:col-start-2 lg:pt-0">
				<Header />

				{children}
			</div>
		</div>
	)
}
