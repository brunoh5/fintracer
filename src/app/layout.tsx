import './globals.css'

import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { Toaster } from '@/components/ui/sonner'

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
		<html lang="pt" className="antialiased" suppressHydrationWarning>
			<head>
				<link rel="icon" href="/favicon.svg" type="image/svg" sizes="any" />
			</head>
			<body className={inter.variable}>
				<div className="min-h-screen bg-background">
					<Providers>
						{children}
						<Toaster richColors />
					</Providers>
					<Analytics />
					<SpeedInsights />
				</div>
			</body>
		</html>
	)
}
