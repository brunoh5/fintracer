import { Receipt } from 'lucide-react'
import type { ReactNode } from 'react'

export default async function AuthLayout({
	children,
}: {
	children: ReactNode
}) {
	return (
		<div className="relative flex min-h-screen antialiased lg:grid lg:grid-cols-2">
			<div className="hidden h-full flex-col justify-between border-r border-foreground/5 bg-muted p-10 text-muted-foreground lg:flex" />
			<div className="absolute left-8 top-9 flex items-center gap-3 text-lg font-medium text-foreground">
				<Receipt className="size-5" />
				<span className="semi-bold">fin.tracer</span>
			</div>
			<footer className="absolute bottom-10 left-8 text-sm">
				Dashboard financeiro &copy; fin.tracer - {new Date().getFullYear()}
			</footer>
			<div className="relative flex flex-col items-center justify-center">
				{children}
			</div>
		</div>
	)
}
