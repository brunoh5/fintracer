import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { PasswordForm } from './password-form'
import { ProfileForm } from './profile-form'

export function ProfileTabs() {
	return (
		<Tabs defaultValue="profile">
			<TabsList className="mb-8 flex w-[300px] items-center justify-start gap-4 bg-transparent font-bold text-foreground">
				<TabsTrigger value="profile">Perfil</TabsTrigger>
				<TabsTrigger value="security">Segurança</TabsTrigger>
			</TabsList>
			<ProfileForm />
			<PasswordForm />
		</Tabs>
	)
}
