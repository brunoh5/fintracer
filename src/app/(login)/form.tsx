'use client'

import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { SyntheticEvent, useRef, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'

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
			<div className="flex flex-col gap-2">
				<label
					htmlFor="email"
					className="font-semibold leading-6 text-muted-foreground"
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
					className="rounded-sm"
				/>
			</div>

			<div className="flex flex-col gap-2">
				{/* <div> */}
				<label
					htmlFor="password"
					className="block font-semibold leading-6 text-muted-foreground"
				>
					Senha
				</label>
				{/* <Link href="/forgotPassword" className="text-xs text-primary">
						Forgot Password
					</Link> */}
				{/* </div> */}
				<Input
					type="password"
					id="password"
					ref={passwordRef}
					placeholder="*********"
					autoComplete="current-password"
					required
					className="rounded-sm"
				/>
			</div>

			<Button
				className="px-2 py-4 text-lg"
				aria-label="login submit"
				type="submit"
			>
				{isLoading ? 'Carregando' : 'Login'}
			</Button>
		</form>
	)
}
