import { ThemeSwitch } from '@components/theme-switch'
import { Button } from '@components/ui/button'
import { Metadata } from 'next'

import { ProfileForm } from '@/components/profile-form'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'

export const metadata: Metadata = {
	title: 'Configurações',
}

export default function Settings() {
	return (
		<div className="space-y-12">
			<ProfileForm />

			<Card className="rounded-none bg-transparent">
				<CardHeader>
					<CardTitle>Aparência</CardTitle>
					<CardDescription>
						Customize como o Fintracer aparece no seu dispositivo
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="w-[240px]">
						<ThemeSwitch />
					</div>
				</CardContent>
			</Card>

			<Card className="rounded-none border-destructive bg-transparent">
				<CardHeader>
					<CardTitle>Deletar Conta</CardTitle>
					<CardDescription>
						Delete permanentemente seus dados da plataforma Fintracer.Esta ação
						é irreversível, por favor proceda com cautela.
					</CardDescription>
				</CardHeader>
				<CardFooter className="flex justify-between">
					<div />
					<Button variant="destructive" disabled>
						Deletar
					</Button>
				</CardFooter>
			</Card>
		</div>
	)
}
