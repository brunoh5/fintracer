'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { SyntheticEvent, useRef, useState } from 'react'
import { signIn } from 'next-auth/react'

import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { Input } from '@/components/input'

export function LoginForm() {
	const { toast } = useToast()
	const { replace } = useRouter()
	const [isLoading, setIsLoading] = useState(false)

	const emailRef = useRef<HTMLInputElement>(null)
	const passwordRef = useRef<HTMLInputElement>(null)

	async function handleLogin(event: SyntheticEvent) {
		event.preventDefault()

		setIsLoading(true)

		const email = emailRef.current?.value
		const password = passwordRef.current?.value

		const response = await signIn('credentials', {
			email,
			password,
			redirect: false,
		})

		if (response?.status !== 200) {
			toast({
				variant: 'destructive',
				title: 'Credenciais Invalidas',
				description: `Tente novamente por favor`,
			})

			setIsLoading(false)

			return
		}

		toast({
			variant: 'default',
			title: 'Sucesso',
			description: 'Login feito com sucesso, aguarde que vamos te redirecionar',
		})

		setIsLoading(false)

		replace('/overview')
	}

	return (
		<form onSubmit={handleLogin} className="flex flex-col gap-6">
			<div>
				<label
					htmlFor="email"
					className="text-gray-900 font-semibold leading-6 block"
				>
					E-mail
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
						Senha
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
				{isLoading ? 'Carregando' : 'Login'}
			</Button>
		</form>
	)
}
