'use client'

import { LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { signOut } from 'next-auth/react'

import { Button } from './ui/button'

export function LogoutButton() {
	const { push } = useRouter()

	async function handleLogout() {
		await signOut({
			redirect: false,
		})

		push('/')
	}

	return (
		<Button
			onClick={handleLogout}
			type="button"
			className="flex items-center justify-start gap-2 px-3 py-2 text-muted-foreground hover:bg-white/[0.08]"
			variant="ghost"
			aria-label="logout button"
		>
			<LogOut className="size-5" />
			Logout
		</Button>
	)
}
