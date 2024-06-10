'use client'

import { ArrowUpRight, ChevronRight } from 'lucide-react'
import Link from 'next/link'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
	Carousel,
	CarouselContent,
	CarouselItem,
} from '@/components/ui/carousel'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { useFetchAccounts } from '@/features/accounts/api/use-fetch-accounts'
import { AccountTypes } from '@/types'

import { AccountListSkeleton } from './account-list-skeleton'

export function TotalBalance() {
	const { data, isLoading } = useFetchAccounts()

	return (
		<Card>
			<CardHeader className="flex">
				<CardTitle>Saldo Atual</CardTitle>
				<div className="flex items-center text-muted-foreground">
					<Link className="text-xs" href="/balances">
						Ver todas
					</Link>
					<ChevronRight size={16} />
				</div>
			</CardHeader>
			<CardContent className="flex flex-col gap-3">
				<div className="flex items-center justify-between">
					{data ? (
						<span className="text-xl font-bold">
							{(data.totalBalanceInCents / 100).toLocaleString('pt-BR', {
								style: 'currency',
								currency: 'BRL',
							})}
						</span>
					) : (
						<Skeleton className="h-5 w-[148px]" />
					)}
				</div>

				<Separator />
				<Carousel>
					<CarouselContent>
						{isLoading && <AccountListSkeleton />}

						{data ? (
							data.accounts.map((account) => (
								<CarouselItem key={account.id}>
									<div className="flex h-24 items-center justify-between rounded-md bg-primary p-4">
										<div>
											<span className="text-nowrap text-xs text-white/70">
												{
													AccountTypes[
														account?.type as keyof typeof AccountTypes
													]
												}
											</span>
											<p className="font-semibold text-white">{account.bank}</p>
											{account.number && (
												<span className="text-xs text-white/70">
													{account.number}
												</span>
											)}
										</div>
										<div className="flex items-center justify-between gap-2 self-end">
											<span className="text-ellipsis text-nowrap font-bold text-white">
												{(account.balance / 100).toLocaleString('pt-BR', {
													style: 'currency',
													currency: 'BRL',
												})}
											</span>
											<Link href={`/balances/${account.id}`}>
												<ArrowUpRight
													size={16}
													className="rounded-full bg-white text-primary"
												/>
												<span className="sr-only">Acessar conta</span>
											</Link>
										</div>
									</div>
								</CarouselItem>
							))
						) : (
							<CarouselItem>
								<div className="bg-primary">
									<span className="text-xs">Nenhuma conta cadastrada</span>
								</div>
							</CarouselItem>
						)}
					</CarouselContent>
				</Carousel>
			</CardContent>
		</Card>
	)
}
