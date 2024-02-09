'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const loginForm = z.object({
	email: z.string().email(),
	password: z.string(),
})

type LoginForm = z.infer<typeof loginForm>

export function LoginForm() {
	const { replace } = useRouter()
	const [isLoading, setIsLoading] = useState(false)

	const { register, handleSubmit } = useForm<LoginForm>({
		resolver: zodResolver(loginForm),
	})

	async function handleLogin({ email, password }: LoginForm) {
		const response = await signIn('credentials', {
			email,
			password,
			redirect: false,
		})

		if (response?.status !== 200) {
			toast.error('Credenciais invalidas')

			setIsLoading(false)

			return
		}

		toast.success('Login feito com sucesso')

		setIsLoading(false)

		replace('/overview')
	}

	return (
		<form onSubmit={handleSubmit(handleLogin)} className="flex flex-col gap-6">
			<div className="flex flex-col gap-2">
				<Label
					htmlFor="email"
					className="font-semibold leading-6 text-muted-foreground"
				>
					E-mail
				</Label>
				<Input
					type="email"
					id="email"
					placeholder="johndoe@email.com"
					autoComplete="email"
					{...register('email')}
				/>
			</div>

			<div className="flex flex-col gap-2">
				{/* <div> */}
				<Label
					htmlFor="password"
					className="block font-semibold leading-6 text-muted-foreground"
				>
					Preencha sua senha
				</Label>
				{/* <Link href="/forgotPassword" className="text-xs text-primary">
						Forgot Password
					</Link> */}
				{/* </div> */}
				<Input
					type="password"
					id="password"
					autoComplete="current-password"
					required
					{...register('password')}
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
