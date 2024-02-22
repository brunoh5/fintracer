import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'

import { nextAuthOptions } from '../api/auth/[...nextauth]/options'
import { LoginForm } from './form'

export default async function Home() {
	// const session = await getServerSession(nextAuthOptions)

	// if (session) {
	// 	redirect('/overview')
	// }

	return (
		<main className="flex h-screen flex-1 items-center justify-center">
			<div className="flex w-full max-w-md flex-col gap-4">
				<h1 className="w-full text-center text-2xl text-primary">
					<span className="font-semibold uppercase">Fin</span>
					tracer
				</h1>

				<LoginForm />

				{/*
				<div className="flex items-center justify-center gap-4 before:flex-1 before:border-b before:border-gray-300 before:content-[''] after:flex-1 after:border-b after:border-gray-300 after:content-['']">
					<p>or sign in with</p>
				</div>

				 <button
					className="my-4 flex w-full items-center justify-center gap-1 rounded bg-gray-200 px-3 py-2 text-center"
					aria-label="Login com google"
				>
					<Image
						src={googleIcon}
						alt="google"
						width={24}
						height={24}
						className="mr-4"
					/>
					Continue with Google
				</button> */}

				<Link href="/signUp" className="block w-full text-center text-primary">
					Crie uma conta
				</Link>
			</div>
		</main>
	)
}
