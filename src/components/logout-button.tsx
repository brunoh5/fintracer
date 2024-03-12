'use client'

import { LogOut } from 'lucide-react'
import { signOut } from 'next-auth/react'

import { Button } from './ui/button'

export function LogoutButton() {
	async function handleLogout() {
		await signOut({
			redirect: false,
			callbackUrl: '/',
		})
	}

	return (
		<Button
			onClick={handleLogout}
			type="button"
			className="flex items-center justify-start gap-4 hover:bg-white/[0.08]"
			variant="ghost"
			aria-label="logout button"
		>
			<LogOut />
			Logout
		</Button>
	)
}
