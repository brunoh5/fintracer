'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
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

	const {
		register,
		handleSubmit,
		formState: { isSubmitting },
	} = useForm<LoginForm>({
		resolver: zodResolver(loginForm),
	})

	async function handleLogin({ email, password }: LoginForm) {
		try {
			const response = await signIn('credentials', {
				email,
				password,
				redirect: false,
			})

			if (response?.status !== 200) {
				toast.error('Credenciais invalidas')
				return
			}

			toast.success('Login realizado com sucesso')

			replace('/overview')
		} catch {
			toast.error('Um erro ocorreu, tente novamente mais tarde')
		}
	}

	return (
		<form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
			<div className="space-y-2">
				<Label htmlFor="email">Seu e-mail</Label>
				<Input
					id="email"
					type="email"
					autoComplete="email"
					{...register('email')}
				/>
			</div>

			<div className="space-y-2">
				<Label htmlFor="password">Sua senha</Label>
				<Input
					type="password"
					id="password"
					autoComplete="current-password"
					required
					{...register('password')}
				/>
			</div>

			<Button
				className="w-full"
				aria-label="login submit"
				type="submit"
				disabled={isSubmitting}
			>
				Acessar dashboard
			</Button>
		</form>
	)
}
