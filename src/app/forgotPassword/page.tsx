import Link from 'next/link'

import { ForgotForm } from '@/components/forms/forgot-form'

export default function ForgotPassword() {
	return (
		<main className="flex h-screen flex-1 items-center justify-center">
			<div className="flex w-full max-w-md flex-col items-center">
				<h1 className="mb-6 w-full text-center text-2xl text-primary">
					<span className="font-semibold uppercase">Fine</span>
					bank.
					<span className="font-semibold uppercase">IO</span>
				</h1>

				<h2 className="text-xl font-bold text-black">Forgot Password?</h2>
				<p className="text-center text-md text-gray-500">
					Enter your email address to get the <br />
					password reset link
				</p>

				<ForgotForm />

				<Link href="#" className="mt-4 block w-full text-center text-gray-400">
					Back to login
				</Link>
			</div>
		</main>
	)
}
