import './globals.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import Providers from './providers'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
	title: {
		template: '%s | Fintracer',
		absolute: 'Sistema para controle financeiro | Fintracer',
	},
	description:
		'Site de organização financeira para controle de gastos pessoais.',
	openGraph: {
		type: 'website',
		title: 'Fintracer',
		url: 'https://fintracer.com.br',
		description:
			'Site de organização financeira para controle de gastos pessoais.',
	},
}

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html
			className={`${inter.variable} antialiased`}
			lang="pt"
		>
			<head>
				<link rel="icon" href="/favicon.svg" type="image/svg" sizes="any" />
			</head>
			<body>
				<div className="min-h-screen bg-background">
					<Providers>{children}</Providers>
				</div>
			</body>
		</html>
	)
}
