'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { useRegister } from '@/app/api/register'
import { signIn } from '@/app/api/sign-in'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const registerForm = z.object({
	name: z.string(),
	email: z.string().email(),
	password: z.string(),
})

type RegisterForm = z.infer<typeof registerForm>

export default function SignUp() {
	const { replace } = useRouter()

	const registerMutation = useRegister()
	const signInMutation = signIn()

	const {
		register,
		handleSubmit,
		formState: { isSubmitting },
	} = useForm<RegisterForm>()

	async function handleRegister(data: RegisterForm) {
		registerMutation.mutate(
			{
				name: data.name,
				email: data.email,
				password: data.password,
			},
			{
				onSuccess: () => {
					signInMutation.mutate(
						{ email: data.email, password: data.password },
						{
							onSuccess: () => {
								replace('/overview')
							},
						},
					)
				},
			},
		)
	}

	return (
		<div className="p-8">
			<Button asChild variant="ghost" className="absolute right-8 top-8">
				<Link href="/">Fazer login</Link>
			</Button>

			<div className="flex w-[350px] flex-col justify-center gap-6">
				<div className="flex flex-col gap-2 text-center">
					<h1 className="w-full font-semibold tracking-tight">
						Criar conta grátis
					</h1>
					<p className="text-sm text-muted-foreground">
						Faça um teste gratis durante 7 dias
					</p>
				</div>

				<form onSubmit={handleSubmit(handleRegister)} className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="name">Seu nome</Label>
						<Input id="name" {...register('name')} autoComplete="name" />
					</div>

					<div className="space-y-2">
						<Label htmlFor="email">Seu e-mail</Label>
						<Input
							type="email"
							id="email"
							autoComplete="email"
							{...register('email')}
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="password">Sua senha</Label>
						<Input
							type="password"
							id="password"
							placeholder="*********"
							autoComplete="new-password"
							required
							{...register('password')}
						/>
					</div>

					<Button className="w-full" type="submit" disabled={isSubmitting}>
						Finalizar cadastro
					</Button>

					<p className="px-6 text-center text-sm leading-relaxed text-muted-foreground">
						Ao continuar voce concorda com os nossos{' '}
						<a href="#" className="underline underline-offset-4">
							Termos de serviços
						</a>{' '}
						e{' '}
						<a href="#" className="underline underline-offset-4">
							Politicas de privacidade
						</a>
					</p>
				</form>
			</div>
		</div>
	)
}
