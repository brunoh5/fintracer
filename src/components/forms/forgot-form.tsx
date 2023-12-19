'use client'

import { FormEvent } from 'react'
import { Input } from '../ui/Input'
import { Button } from '../ui/button'

export function ForgotForm() {
	async function handleForgotPassword(event: FormEvent<HTMLFormElement>) {
		event.preventDefault()

		return null
	}

	return (
		<form className="w-full max-w-[400px]" onSubmit={handleForgotPassword}>
			<Input.Root>
				<Input.Label text="Email Address" name="email" />
				<Input.Wrapper>
					<Input.Content
						name="email"
						placeholder="johndoe@email.com"
						type="email"
						autoComplete="email"
					/>
				</Input.Wrapper>
			</Input.Root>

			<Button aria-label="forgot password submit">Password Reset</Button>
		</form>
	)
}
