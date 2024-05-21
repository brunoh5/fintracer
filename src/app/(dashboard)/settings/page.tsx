import { Metadata } from 'next'

import { Card, CardContent } from '@/components/ui/card'

import { ProfileTabs } from './profile-tabs'

export const metadata: Metadata = {
	title: 'Configurações',
}

export default function Settings() {
	return (
		<main className="relative flex flex-col gap-y-8 pb-8 pl-6 pr-8 pt-4">
			<Card className="pt-6">
				<h2 className="sr-only">Atualizar perfil ou senha</h2>
				<CardContent>
					<ProfileTabs />
				</CardContent>
			</Card>
		</main>
	)
}
