import { Receipt } from 'lucide-react'
import { ReactNode } from 'react'

export default async function AuthLayout({
	children,
}: {
	children: ReactNode
}) {
	return (
		<div className="grid min-h-screen grid-cols-2 antialiased">
			<div className="flex h-full flex-col justify-between border-r border-foreground/5 bg-muted p-10 text-muted-foreground">
				<div className="flex items-center gap-3 text-lg font-medium text-foreground">
					<Receipt className="size-5" />
					<span className="semi-bold">fin.tracer</span>
				</div>
				<footer className="text-sm">
					Dashboard financeiro &copy; fin.tracer - {new Date().getFullYear()}
				</footer>
			</div>
			<div className="relative flex flex-col items-center justify-center">
				{children}
			</div>
		</div>
	)
}
