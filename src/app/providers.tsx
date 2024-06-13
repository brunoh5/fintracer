'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { ReactNode, useState } from 'react'

import { DialogProvider } from './dialog-provider'

export default function Providers({ children }: { children: ReactNode }) {
	const [queryClient] = useState(() => new QueryClient())

	return (
		<SessionProvider>
			<QueryClientProvider client={queryClient}>
				<NextThemesProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<DialogProvider />
					{children}
				</NextThemesProvider>
			</QueryClientProvider>
		</SessionProvider>
	)
}
