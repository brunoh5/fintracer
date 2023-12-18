'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FormEvent, SyntheticEvent, useRef } from 'react'
import { signIn } from 'next-auth/react'

import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'

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
		}

		replace('/overview')
	}

	return (
		<form onSubmit={handleLogin}>
			<input type="text" name="email" id="email" ref={emailRef} />
			<input type="password" name="password" id="password" ref={passwordRef} />
			<button type="submit">Enviar</button>
		</form>
		// <form onSubmit={handleLogin} className="flex flex-col gap-6">
		// 	<Input.Root>
		// 		<Input.Label name="email" text="Email Address" />
		// 		<Input.Wrapper>
		// 			<Input.Content
		// 				name="email"
		// 				id="email"
		// 				placeholder="johndoe@email.com"
		// 				type="email"
		// 				autoComplete="email"
		// 				required
		// 			/>
		// 		</Input.Wrapper>
		// 	</Input.Root>

		// 	<Input.Root>
		// 		<div className="flex justify-between">
		// 			<Input.Label name="password" text="Password" />
		// 			<Link href="/forgotPassword" className="text-xs text-persian-green">
		// 				Forgot Password
		// 			</Link>
		// 		</div>
		// 		<Input.Wrapper>
		// 			<Input.Content
		// 				name="password"
		// 				id="password"
		// 				placeholder="*********"
		// 				type="password"
		// 				autoComplete="current-password"
		// 				required
		// 			/>
		// 		</Input.Wrapper>
		// 	</Input.Root>

		// 	<Button aria-label="login submit" type="submit">
		// 		Login
		// 	</Button>
		// </form>
	)
}
