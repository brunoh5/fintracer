'use client'

import Cookie from 'js-cookie'
import { LogOut } from 'lucide-react'
import { redirect } from 'next/navigation'
import { Button } from './button'

export function LogoutButton() {
	function handleLogout() {
		Cookie.remove('token')
		Cookie.remove('user')
		redirect('/')
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
