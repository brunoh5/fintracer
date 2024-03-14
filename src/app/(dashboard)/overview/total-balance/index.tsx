'use client'

import { useQuery } from '@tanstack/react-query'
import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'

import { fetchAccounts } from '@/app/api/fetch-accounts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@/components/ui/carousel'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { AccountTypes } from '@/types'

import { AccountListSkeleton } from './account-list-skeleton'

export function TotalBalance() {
	const { data: resume, isLoading } = useQuery({
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
						{isLoading ? (
							<Skeleton />
						) : (
							<span className="text-xl font-bold">
								{resume?.total?.toLocaleString('pt-BR', {
									style: 'currency',
									currency: 'BRL',
								})}
							</span>
						)}
					</>
					<Link href="/balances" className="text-xs text-muted-foreground">
						Todas as contas
					</Link>
				</div>

				<Separator />
				<Carousel className="overflow-hidden">
					<CarouselContent>
						{isLoading ? (
							<AccountListSkeleton />
						) : (
							resume?.accounts?.map((account) => (
								<CarouselItem
									key={account.id}
									className="flex flex-col rounded-md bg-primary p-2"
								>
									<div className="flex flex-col">
										<span className="text-white/70">
											{AccountTypes[account?.type as keyof typeof AccountTypes]}
										</span>
										<p className="text-white">{account.bank}</p>
										<span className="text-white/70">{account.number}</span>
									</div>
									<div className="flex flex-col items-end justify-between gap-4">
										<div className="flex items-center justify-between gap-2 self-end">
											<span className="font-bold text-white">
												{account.balance.toLocaleString('pt-BR', {
													style: 'currency',
													currency: 'BRL',
													maximumFractionDigits: 2,
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
						)}
						<CarouselPrevious />
						<CarouselNext />
					</CarouselContent>
				</Carousel>
			</CardContent>
		</Card>
	)
}
