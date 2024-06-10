import { get } from '@vercel/edge-config'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'

import { nextAuthOptions } from '@/app/api/auth/[...nextauth]/options'
import { Button } from '@/components/ui/button'

import { LoginForm } from './login-form'

export default async function Home() {
	const session = await getServerSession(nextAuthOptions)
	const isInMaintenanceMode = await get('isInMaintenanceMode')

	if (!isInMaintenanceMode && session) {
		redirect('/overview')
	}

	return (
		<div className="p-8">
			<Button asChild variant="ghost" className="absolute right-8 top-8">
				<Link href="/sign-up">Nova conta</Link>
			</Button>

			<div className="flex w-[350px] flex-col justify-center gap-6">
				<div className="flex flex-col gap-2 text-center">
					<h1 className="w-full font-semibold tracking-tight">
						Acessar dashboard
					</h1>
					<p className="text-sm text-muted-foreground">
						Gerencie suas finanças usando o painel
					</p>
				</div>

				<LoginForm />
			</div>
		</div>
	)
}
