import { Header } from '@/components/header'
import { Sidebar } from '@/components/sidebar'
import { BillsContextProvider } from '@/contexts/BillsContext'

export default async function DashboardLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<div className="min-h-screen gap-6 lg:grid lg:grid-cols-app">
			<Sidebar />

			<div className="max-w-screen lg:col-start-2 lg:pt-0 lg:pr-6">
				{/* <SubscribeArea /> */}

				<Header />

				<BillsContextProvider>{children}</BillsContextProvider>
			</div>
		</div>
	)
}
