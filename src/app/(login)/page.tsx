import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'

import loginImg from '@/assets/login-image.jpg'

import { nextAuthOptions } from '../api/auth/[...nextauth]/options'
import { LoginForm } from './form'

export default async function Home() {
	const session = await getServerSession(nextAuthOptions)

	if (session) {
		redirect('/overview')
	}

	return (
		<main className="relative flex h-screen flex-col items-center justify-center lg:grid lg:grid-cols-2">
			<div className="relative h-full w-full overflow-hidden">
				<Image src={loginImg} alt="" className="h-full w-full object-cover" />
				<div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/90 via-black/60 to-black/0 p-12">
					<p className="my-8 text-justify">
						Nosso sistema de controle financeiro permite cadastrar contas de
						forma fácil e eficiente, oferecendo uma visão abrangente de suas
						finanças. Organize suas contas com praticidade e tenha o controle
						total de seus recursos.
					</p>
				</div>
			</div>
			<div className="absolute -mt-12 flex flex-col items-center justify-center gap-4 rounded-2xl bg-black/90 p-12 lg:static">
				<h1 className="w-full text-center text-2xl text-primary">
					<span className="font-semibold uppercase">Fin</span>
					tracer
				</h1>

				<LoginForm />

				<Link href="/signUp" className="block w-full text-center text-primary">
					Crie uma conta
				</Link>
			</div>
		</main>
	)
}
