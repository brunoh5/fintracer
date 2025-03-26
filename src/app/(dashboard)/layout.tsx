import { Header } from '@/components/header'
import { Sidebar } from '@/components/sidebar'

export default async function DashboardLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<div className="min-h-screen gap-6 lg:grid lg:grid-cols-app">
			<Sidebar />

			<div className="max-w-screen lg:col-start-2 lg:pt-0 lg:pr-6">
				<Header />

				{children}
			</div>
		</div>
	)
}
