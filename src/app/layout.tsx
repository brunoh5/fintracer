import { Toaster } from '@/components/ui/toaster'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'FinTrack',
  description:
    'Site de organização financeira para controle de gastos pessoais e empresariais.',
}

// if (process.env.NODE_ENV === 'development') {
//   console.log('Testing')
//   Adicionar MirageJS
// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={inter.variable}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
