import { Sidebar } from '@/components/sidebar'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { nextAuthOptions } from '../api/auth/[...nextauth]/route'
import { api } from '@/services/api'

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
		<div className="flex">
			<Sidebar />

			{children}
		</div>
	)
}
