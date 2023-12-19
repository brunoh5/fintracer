'use client'

import { useQuery } from '@tanstack/react-query'
import { getSession } from 'next-auth/react'

import { Button } from '@/components/ui/button'
import { api } from '@/services/api'
import { AccountProps } from '@/types'

export function BalanceAccount({ accountId }: { accountId: string }) {
	const { data: account } = useQuery<AccountProps>({
		queryKey: ['accounts', accountId],
		queryFn: async () => {
			const session = await getSession()

			const response = await api.get(`/accounts/${accountId}`, {
				headers: {
					Authorization: `Bearer ${session?.user}`,
				},
			})

			return response.data.account
		},
	})

	return (
		<div className="flex flex-col gap-10 w-full rounded-lg bg-white px-6 py-5">
			<div className="grid grid-cols-3 gap-y-10 gap-x-28">
				<div>
					<p className="text-gray-300">Nome do Banco</p>
					<p className="text-lg font-bold">{account?.bank}</p>
				</div>
				<div>
					<p className="text-gray-300">Tipo da conta</p>
					<p className="text-lg font-bold">{account?.type}</p>
				</div>
				<div>
					<p className="text-gray-300">Saldo Atual</p>
					<p className="text-lg font-bold">
						{account &&
							new Intl.NumberFormat('pt-BR', {
								style: 'currency',
								currency: 'BRL',
							}).format(account.balance)}
					</p>
				</div>
				<div>
					<p className="text-gray-300">Endereço</p>
					<p className="text-lg font-bold">Park Street Branch</p>
				</div>
				<div>
					<p className="text-gray-300">Numero da conta</p>
					<p className="text-lg font-bold">{account?.number}</p>
				</div>
			</div>
			<div className="flex items-center gap-4">
				<Button size="lg">Editar Conta</Button>
				<Button size="lg" background="off">
					Remove
				</Button>
			</div>
		</div>
	)
}
