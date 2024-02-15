import './globals.css'

import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { Toaster } from '@/components/ui/sonner'
import { cn } from '@/lib/utils'

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
			<head>
				<link rel="icon" href="/favicon.png" sizes="any" />
			</head>
			<body className={cn('bg-background', inter.variable)}>
				<Providers>
					{children}
					<Toaster richColors />
				</Providers>
				<Analytics />
				<SpeedInsights />
			</body>
		</html>
	)
}
