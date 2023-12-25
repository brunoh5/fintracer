'use client'

import { LogOut } from 'lucide-react'
import { Button } from './button'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export function LogoutButton() {
	const { replace } = useRouter()

	async function handleLogout() {
		await signOut({
			redirect: false,
		})

		replace('/')
	}

	return (
		<Button
			onClick={handleLogout}
			type="button"
			className="w-full hover:bg-white/[0.08] text-zinc-50 flex items-center justify-start bg-transparent"
			aria-label="logout button"
		>
			<LogOut className="mr-4" />
			Logout
		</Button>
	)
}
