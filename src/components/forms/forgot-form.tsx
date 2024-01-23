'use client'

import { FormEvent, useRef } from 'react'

import { Button } from '../ui/button'
import { Input } from '../ui/input'

export function ForgotForm() {
	const emailRef = useRef<HTMLInputElement>(null)

	async function handleForgotPassword(event: FormEvent<HTMLFormElement>) {
		event.preventDefault()

		const data = {
			email: emailRef.current?.value,
		}

		console.log(data)

		return null
	}

	return (
		<form className="w-full max-w-[400px]" onSubmit={handleForgotPassword}>
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
					ref={emailRef}
					autoComplete="email"
					required
					placeholder="johndoe@email.com"
				/>
			</div>

			<Button aria-label="forgot password submit">Password Reset</Button>
		</form>
	)
}
