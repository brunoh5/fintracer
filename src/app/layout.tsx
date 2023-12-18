import { Toaster } from '@/components/ui/toaster'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Providers from './providers'
import { getServerSession } from 'next-auth'
import { nextAuthOptions } from './api/auth/[...nextauth]/route'
import { api } from '@/services/api'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
	title: 'FinTrack',
	description:
		'Site de organização financeira para controle de gastos pessoais e empresariais.',
}

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const session = await getServerSession(nextAuthOptions)

	api.interceptors.request.use((config) => {
		config.headers.Authorization = `Bearer ${session?.user}`

		return config
	})

	// api.defaults.headers.Authorization = `Bearer ${session?.user}`

	return (
		<html lang="pt-BR" suppressHydrationWarning>
			<body className={inter.variable}>
				<Providers>
					{children}
					<Toaster />
				</Providers>
			</body>
		</html>
	)
}
