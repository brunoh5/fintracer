'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { SyntheticEvent, useRef } from 'react'
import { signIn } from 'next-auth/react'

import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { Input } from '@/components/input'

export function LoginForm() {
	const { toast } = useToast()
	const { replace } = useRouter()

	const emailRef = useRef<HTMLInputElement>(null)
	const passwordRef = useRef<HTMLInputElement>(null)

	async function handleLogin(event: SyntheticEvent) {
		event.preventDefault()

		const email = emailRef.current?.value
		const password = passwordRef.current?.value

		const response = await signIn('credentials', {
			email,
			password,
		})

		if (response?.error) {
			toast({
				variant: 'destructive',
				title: 'Algo de errado ocorreu',
				description: `${response.error}`,
			})

			return
		}

		replace('/overview')
	}

	return (
		<form onSubmit={handleLogin} className="flex flex-col gap-6">
			<div>
				<label
					htmlFor="email"
					className="text-gray-900 font-semibold leading-6 block"
				>
					Email Address
				</label>
				<Input
					type="email"
					id="email"
					ref={emailRef}
					placeholder="johndoe@email.com"
					autoComplete="email"
					required
				/>
			</div>

			<div>
				<div>
					<label
						htmlFor="password"
						className="text-gray-900 font-semibold leading-6 block"
					>
						Email Address
					</label>
					<Link href="/forgotPassword" className="text-xs text-persian-green">
						Forgot Password
					</Link>
				</div>
				<Input
					type="password"
					id="password"
					ref={passwordRef}
					placeholder="*********"
					autoComplete="current-password"
					required
				/>
			</div>

			<Button aria-label="login submit" type="submit">
				Login
			</Button>
		</form>
	)
}
