import type { Metadata } from 'next'

import { PasswordForm } from '@/components/password-form'

export const metadata: Metadata = {
	title: 'Segurança | Fintracer',
}

export default async function Security() {
	return (
		<div className="space-y-12">
			<PasswordForm />
		</div>
	)
}
