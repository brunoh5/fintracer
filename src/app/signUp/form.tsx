'use client'

import { useRouter } from 'next/navigation'
import { SyntheticEvent, useRef } from 'react'

import { api } from '@/services/api'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { signIn } from 'next-auth/react'
import { Input } from '@/components/input'

export function SignUpForm() {
	const { toast } = useToast()
	const { replace } = useRouter()

	const nameRef = useRef<HTMLInputElement>(null)
	const emailRef = useRef<HTMLInputElement>(null)
	const passwordRef = useRef<HTMLInputElement>(null)

	async function handleRegister(event: SyntheticEvent) {
		event.preventDefault()

		const data = {
			email: emailRef.current?.value,
			password: passwordRef.current?.value,
		}

		try {
			await api.post('/users', {
				...data,
				name: nameRef.current?.value,
			})
		} catch {
			toast({
				variant: 'destructive',
				title: 'E-mail já cadastrado',
				description: 'Usuario já existente',
			})

			return
		}

		await signIn('credentials', {
			...data,
			redirect: false,
		})

		replace('/overview')
	}

	return (
		<form onSubmit={handleRegister} className="flex flex-col gap-6">
			<div>
				<label
					htmlFor="name"
					className="text-gray-900 font-semibold leading-6 block"
				>
					E-mail
				</label>
				<Input
					type="name"
					id="name"
					ref={nameRef}
					autoComplete="name"
					required
				/>
			</div>

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
				<label
					htmlFor="password"
					className="text-gray-900 font-semibold leading-6 block"
				>
					Senha
				</label>
				<Input
					type="password"
					id="password"
					ref={passwordRef}
					placeholder="*********"
					autoComplete="new-password"
					required
				/>
			</div>

			{/* <div className="mt-4 w-full">
				<p className="mx-auto">
					By continuing, you agree to our{' '}
					<span className="text-persian-green">terms of service.</span>
				</p>
			</div> */}

			<Button aria-label="sign up submit" type="submit">
				Registre-se
			</Button>
		</form>
	)
}
