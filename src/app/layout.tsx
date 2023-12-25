import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

import './globals.css'
import { Toaster } from '@/components/ui/toaster'
import Providers from './providers'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
	title: {
		template: '%s | Fintracer',
		absolute: 'Fintracer',
	},
	description:
		'Site de organização financeira para controle de gastos pessoais e empresariais.',
}

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="pt-BR" suppressHydrationWarning>
			<body className={inter.variable}>
				<Providers>
					{children}
					<Toaster />
				</Providers>
				<Analytics />
				<SpeedInsights />
			</body>
		</html>
	)
}
