'use client'

import { Toaster } from '@components/ui/sonner'
import { queryClient } from '@lib/react-query'
import { QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import type { ReactNode } from 'react'

import { DialogProvider } from './dialog-provider'

export default function Providers({ children }: { children: ReactNode }) {
	return (
		<QueryClientProvider client={queryClient}>
			<NextThemesProvider
				attribute="class"
				defaultTheme="system"
				enableSystem
				disableTransitionOnChange
			>
				<DialogProvider />
				{children}
				<Toaster richColors />
			</NextThemesProvider>
		</QueryClientProvider>
	)
}
