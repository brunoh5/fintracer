import { ChevronLeft, Download } from 'lucide-react'
import Link from 'next/link'

import { fetchPrice } from '@/app/api/fauna/fetch-price'
import { Whatsapp } from '@/assets/whatsapp'
import { SubscribeButton } from '@/components/subscribe-button'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export default async function Plans() {
	const price = await fetchPrice()

	return (
		<main className="relative flex flex-col gap-y-8 pb-8 pl-6 pr-8 pt-4">
			<div className="overflow-hidden rounded-t-3xl bg-muted">
				<div className="h-16 w-full  bg-primary/80" />
				<div className="relative space-y-6 overflow-hidden px-12 pb-12 pt-6">
					<Link href="/overview" prefetch className="absolute left-8 ">
						<Button
							variant="ghost"
							className="flex items-center justify-center gap-2"
						>
							<ChevronLeft className="size-4" />
							Voltar
						</Button>
					</Link>
					<p className="text-semibold text-center text-2xl">
						Seu período de testes acabou
					</p>
					<div className="grid grid-cols-1 grid-rows-plans gap-6 lg:grid-cols-2">
						<Card className="bg-primary/90">
							<CardContent className="flex flex-col items-center gap-4 p-6">
								<p className="text-nowrap text-center text-xl font-medium">
									Assinatura Mensal
								</p>
								<div className="flex items-center gap-2">
									<p className="text-nowrap text-4xl font-bold">
										{price.amount}
									</p>
									<span className="text-lg font-semibold text-foreground">
										/mês
									</span>
								</div>
								<SubscribeButton />
								<span className="text-center text-xs text-foreground">
									Valor cobrado todos os meses
								</span>
							</CardContent>
						</Card>
						<Card>
							<CardContent className="flex flex-col items-center gap-4 p-6">
								<p>Entrar em contato com o suporte</p>
								<p>Ficou com dúvidas? Entre em contato comigo</p>
								<div className="flex items-center justify-center gap-2">
									<Whatsapp height={24} width={24} />
									<span>(31) 9 3619-7270</span>
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardContent className="flex flex-col gap-4 p-6">
								<p>Exportar seus dados</p>
								<span>Clique no botão abaixo para exportar seus dados.</span>
								<Button className="flex items-center justify-center gap-4">
									Exportar dados
									<Download className="size-4" />
								</Button>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</main>
	)
}
