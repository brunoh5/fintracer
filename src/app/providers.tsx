'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ReactQueryStreamedHydration } from '@tanstack/react-query-next-experimental'
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { ReactNode, useState } from 'react'

// import { env } from '@/env'

// import { server } from './api/mocks/server'

export default function Providers({ children }: { children: ReactNode }) {
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						staleTime: 1000 * 60 * 5, // 5 minutes
					},
				},
			}),
	)

	// if (env.NODE_ENV === 'development' || env.NODE_ENV === 'test') {
	// 	server.listen({
	// 		onUnhandledRequest: 'bypass',
	// 	})
	// }

	return (
		<SessionProvider>
			<QueryClientProvider client={queryClient}>
				<ReactQueryStreamedHydration>
					<NextThemesProvider
						attribute="class"
						defaultTheme="system"
						enableSystem
						disableTransitionOnChange
					>
						{children}
					</NextThemesProvider>
				</ReactQueryStreamedHydration>
				<ReactQueryDevtools initialIsOpen={false} />
			</QueryClientProvider>
		</SessionProvider>
	)
}
