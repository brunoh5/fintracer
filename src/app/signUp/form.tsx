'use client'

import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { api } from '@/services/api'

const registerForm = z.object({
	name: z.string(),
	email: z.string().email(),
	password: z.string(),
})

type RegisterForm = z.infer<typeof registerForm>

export function SignUpForm() {
	const { replace } = useRouter()
	const { register, handleSubmit } = useForm<RegisterForm>()

	async function handleRegister(data: RegisterForm) {
		try {
			await api.post('/users', data)
		} catch {
			toast.error('E-mail já cadastrado')
			return
		}

		await signIn('credentials', {
			...data,
			redirect: false,
		})

		replace('/overview')
	}

	return (
		<form
			onSubmit={handleSubmit(handleRegister)}
			className="flex flex-col gap-6"
		>
			<div>
				<label
					htmlFor="name"
					className="block font-semibold leading-6 text-gray-900"
				>
					Digite seu nome
				</label>
				<Input id="name" {...register('name')} autoComplete="name" required />
			</div>

			<div>
				<label
					htmlFor="email"
					className="block font-semibold leading-6 text-gray-900"
				>
					E-mail
				</label>
				<Input
					type="email"
					id="email"
					placeholder="johndoe@email.com"
					autoComplete="email"
					required
					{...register('email')}
				/>
			</div>

			<div>
				<label
					htmlFor="password"
					className="block font-semibold leading-6 text-gray-900"
				>
					Senha
				</label>
				<Input
					type="password"
					id="password"
					placeholder="*********"
					autoComplete="new-password"
					required
					{...register('password')}
				/>
			</div>

			{/* <div className="mt-4 w-full">
				<p className="mx-auto">
					By continuing, you agree to our{' '}
					<span className="text-primary">terms of service.</span>
				</p>
			</div> */}

			<Button aria-label="sign up submit" type="submit">
				Registre-se
			</Button>
		</form>
	)
}
