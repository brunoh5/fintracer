'use client'

import { useQuery } from '@tanstack/react-query'
import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'

import { fetchAccounts } from '@/api/fetch-accounts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
	Carousel,
	CarouselContent,
	CarouselItem,
} from '@/components/ui/carousel'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { AccountTypes } from '@/types'

import { AccountListSkeleton } from './account-list-skeleton'

export function TotalBalance() {
	const { data: resume } = useQuery({
		queryKey: ['resume-accounts'],
		queryFn: fetchAccounts,
	})

	return (
		<Card>
			<CardHeader className="flex">
				<CardTitle className="text-xl">Balanço Geral</CardTitle>
			</CardHeader>
			<CardContent className="flex flex-col gap-3">
				<div className="flex items-center justify-between">
					<>
						{resume ? (
							<span className="text-xl font-bold">
								{new Intl.NumberFormat('pt-BR', {
									style: 'currency',
									currency: 'BRL',
								}).format(Number(resume.total))}
							</span>
						) : (
							<Skeleton className="h-5 w-[148px]" />
						)}
					</>
					<Link href="/balances" className="text-xs text-muted-foreground">
						Todas as contas
					</Link>
				</div>

				<Separator />
				<Carousel>
					<CarouselContent>
						{resume ? (
							resume.accounts.map((account) => (
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
												{account.balance.toLocaleString('pt-BR', {
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
							<AccountListSkeleton />
						)}
					</CarouselContent>
				</Carousel>
			</CardContent>
		</Card>
	)
}
