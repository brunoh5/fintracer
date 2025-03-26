'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { signIn } from '@/app/api/sign-in'
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

	const signInMutation = signIn()

	const {
		register,
		handleSubmit,
		formState: { isSubmitting },
	} = useForm<LoginForm>({
		resolver: zodResolver(loginForm),
	})

	async function handleLogin({ email, password }: LoginForm) {
		signInMutation.mutate(
			{ email, password },
			{
				onSuccess: () => {
					replace('/overview')
				},
			}
		)
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
				className="w-full cursor-pointer"
				aria-label="login submit"
				type="submit"
				disabled={isSubmitting}
			>
				Acessar dashboard
			</Button>
		</form>
	)
}
