import Link from 'next/link'

import { SignUpForm } from './form'

export default function SignUp() {
	return (
		<main className="flex h-screen flex-1 items-center justify-center">
			<div className="flex w-full max-w-md flex-col gap-4">
				<h1 className="w-full text-center text-2xl text-primary">
					<span className="font-semibold uppercase">Fin</span>
					tracer
				</h1>

				<h2 className="text-center text-xl font-bold">Crie sua conta</h2>

				<SignUpForm />

				{/* <div className="flex items-center justify-center gap-4 before:flex-1 before:border-b before:border-gray-300 before:content-[''] after:flex-1 after:border-b after:border-gray-300 after:content-['']">
					or sign up with
				</div> */}

				<div className="text-center">
					Já é cadastrado?{' '}
					<Link href="/" className="text-primary">
						Faça login aqui
					</Link>
				</div>
			</div>
		</main>
	)
}
