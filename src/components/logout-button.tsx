'use client'

import { LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { Button } from './ui/button'
import { signOut } from '@/app/api/sign-out'

export function LogoutButton() {
	const { replace } = useRouter()

	const logOutMutation = signOut()

	async function handleLogout() {
		logOutMutation.mutate(undefined, {
			onSuccess: () => {
				replace('/')
			}
		})
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
