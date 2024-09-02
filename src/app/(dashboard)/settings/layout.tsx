import { SecondaryMenu } from '@components/secondary-menu'

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="mb-8 max-w-[800px]">
			<SecondaryMenu
				items={[
					{ path: '/settings', label: 'Geral' },
					{ path: '/settings/accounts', label: 'Contas' },
					{ path: '/settings/security', label: 'Segurança' },
				]}
			/>

			<main className="mt-8">{children}</main>
		</div>
	)
}
