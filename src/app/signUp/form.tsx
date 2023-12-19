'use client'

import { useRouter } from 'next/navigation'
import { FormEvent } from 'react'

import { api } from '@/services/api'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'

export function SignUpForm() {
	const { toast } = useToast()
	const { replace } = useRouter()

	async function handleRegister(event: FormEvent<HTMLFormElement>) {
		event.preventDefault()

		const formData = new FormData(event.currentTarget)

		const response = await api.post('/users/create', {
			name: formData.get('name'),
			email: formData.get('email'),
			password: formData.get('password'),
		})

		if (response?.status !== 201) {
			toast({
				variant: 'destructive',
				title: 'Algo de errado ocorreu',
				description: `${response.data}`,
			})

			return
		}

		replace('/overview')
	}

	return (
		<form onSubmit={handleRegister} className="flex flex-col gap-6">
			<Input.Root>
				<Input.Label text="Name" name="name" />
				<Input.Wrapper>
					<Input.Content
						name="name"
						placeholder="Bruno Henrique"
						autoComplete="name"
					/>
				</Input.Wrapper>
			</Input.Root>
			<Input.Root>
				<Input.Label text="Email Address" name="email" />
				<Input.Wrapper>
					<Input.Content
						type="email"
						name="email"
						placeholder="hello@example.com"
						autoComplete="email"
					/>
				</Input.Wrapper>
			</Input.Root>
			<Input.Root>
				<Input.Label name="password" text="Password" />
				<Input.Wrapper>
					<Input.Content
						type="password"
						name="password"
						placeholder="*********"
						autoComplete="new-password"
					/>
				</Input.Wrapper>
			</Input.Root>

			{/* <div className="mt-4 w-full">
				<p className="mx-auto">
					By continuing, you agree to our{' '}
					<span className="text-persian-green">terms of service.</span>
				</p>
			</div> */}

			<Button aria-label="sign up submit" type="submit">
				Sign up
			</Button>
		</form>
	)
}
