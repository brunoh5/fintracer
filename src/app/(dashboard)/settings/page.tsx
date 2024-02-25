'use client'

import { Tabs } from '@radix-ui/react-tabs'

import { TabsTrigger } from '@/components/tabs-trigger'
import { Card, CardContent } from '@/components/ui/card'
import { TabsList } from '@/components/ui/tabs'

import { PasswordForm } from './password-form'
import { ProfileForm } from './profile-form'

export default function Settings() {
	return (
		<main className="relative flex flex-col gap-y-8 pb-8 pl-6 pr-8 pt-4">
			<Card className="pt-6">
				<h2 className="sr-only">Atualizar perfil ou senha</h2>
				<CardContent>
					<Tabs defaultValue="profile">
						<TabsList className="mb-8 flex w-[300px] items-center justify-start gap-4 bg-transparent font-bold text-foreground">
							<TabsTrigger value="profile">Perfil</TabsTrigger>
							<TabsTrigger value="security">Segurança</TabsTrigger>
						</TabsList>
						<ProfileForm />
						<PasswordForm />
					</Tabs>
				</CardContent>
			</Card>
		</main>
	)
}
