'use client'

import { Button } from '@components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@components/ui/card'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@components/ui/dropdown-menu'
import { Skeleton } from '@components/ui/skeleton'
import { useFetchAccounts } from '@features/accounts/api/use-fetch-accounts'
import { useOpenAccount } from '@features/accounts/hooks/use-open-account'
import { Ellipsis } from 'lucide-react'

import { formatCurrency } from '@/utils/price-formatter'

const accountTypeMapper: Record<string, string> = {
	CURRENT_ACCOUNT: 'Conta Corrente',
	INVESTMENT_ACCOUNT: 'Conta de investimentos',
	SAVINGS_ACCOUNT: 'Conta poupança',
	MACHINE_ACCOUNT: 'Maquininha de cartão',
}

export default function Accounts() {
	const { data, isLoading: isLoadingAccounts } = useFetchAccounts()
	const { onOpen } = useOpenAccount()

	return (
		<Card className="rounded-none bg-transparent">
			<CardHeader>
				<CardTitle>Contas de Banco</CardTitle>
				<CardDescription>
					Gerencie suas contas bancarias, atualize e adicione outras
				</CardDescription>
			</CardHeader>
			<CardContent>
				<ul className="space-y-4">
					{!isLoadingAccounts && !data?.accounts.length && (
						<div>
							<p>Nenhuma conta cadastrada</p>
						</div>
					)}

					{isLoadingAccounts ? (
						<li className="flex items-center justify-between">
							<div className="space-y-2">
								<Skeleton className="h-4 w-40" />
								<Skeleton className="h-2 w-36" />
								<Skeleton className="h-2 w-36" />
							</div>

							<Button variant="outline" size="icon">
								<Ellipsis className="size-3" />
							</Button>
						</li>
					) : (
						data?.accounts?.map((account) => (
							<li
								key={account.id}
								className="flex items-center justify-between"
							>
								<div className="space-y-2">
									<h4 className="font-semibold leading-none tracking-tight">
										{account.bank}
									</h4>
									<p className="text-sm text-muted-foreground">
										{accountTypeMapper[account.type]}
									</p>
									<p className="text-sm text-muted-foreground">
										Saldo Atual:{' '}
										{formatCurrency(account.balance)}
									</p>
								</div>

								<DropdownMenu>
									<DropdownMenuTrigger>
										<Button variant="outline" size="icon">
											<Ellipsis className="size-3" />
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent align="end">
										<DropdownMenuItem onClick={() => onOpen(account.id)}>
											Editar
										</DropdownMenuItem>
										<DropdownMenuItem className="text-rose-500">
											Deletar
										</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							</li>
						))
					)}
				</ul>
			</CardContent>
		</Card>
	)
}
