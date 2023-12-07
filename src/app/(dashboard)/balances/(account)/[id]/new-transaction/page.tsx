'use client'

import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/button'
import { Header } from '@/components/header'
import { useToast } from '@/components/ui/use-toast'
import { api } from '@/services/api'
import dayjs from 'dayjs'
import Cookie from 'js-cookie'
import { useRouter } from 'next/navigation'
import { FormEvent, useEffect, useState } from 'react'

type Category = {
	id: string
	name: string
}

export default function Account({ params }: { params: { id: string } }) {
	const token = Cookie.get('token')
	const { toast } = useToast()
	const router = useRouter()

	const [categories, setCategories] = useState<Category[]>([])

	const [paid_at, setPaidAt] = useState('')

	useEffect(() => {
		api
			.get('/categories', {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				setCategories(res.data.categories)
			})
	}, [token])

	async function handleRegister(event: FormEvent<HTMLFormElement>) {
		event.preventDefault()

		try {
			const formData = new FormData(event.currentTarget)

			const data = {
				accountId: params.id,
				name: formData.get('name'),
				shopName: formData.get('shopName'),
				amount: formData.get('amount'),
				paid_at: dayjs(paid_at) || null,
				type: formData.get('type'),
				payment_method: formData.get('payment_method'),
				categoryId: formData.get('categoryId'),
			}

			await api.post('/transactions', data, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})

			router.push(`/balances/${params.id}`)
		} catch (err) {
			toast({
				variant: 'destructive',
				title: 'Uh oh! Something went wrong',
				description: `${err}`,
			})
		}
	}

	return (
		<div className="flex w-screen flex-col">
			<Header />

			<main className="relative flex flex-col gap-4 pb-8 pl-6 pr-8 pt-4">
				<form onSubmit={handleRegister} className="flex flex-col gap-6">
					<Input.Root>
						<Input.Label text="Name" name="name" />
						<Input.Wrapper>
							<Input.Content name="name" placeholder="Nome da transação" />
						</Input.Wrapper>
					</Input.Root>

					<Input.Root>
						<Input.Label text="Estabelecimento/Site" name="shopName" />
						<Input.Wrapper>
							<Input.Content name="shopName" placeholder="Walmart" />
						</Input.Wrapper>
					</Input.Root>

					<Input.Root>
						<Input.Label name="amount" text="Valor" />
						<Input.Wrapper>
							<Input.Content type="number" name="amount" />
						</Input.Wrapper>
					</Input.Root>

					<Input.Root>
						<Input.Label
							name="paid_at"
							text="Se estiver pago preencha a data"
						/>
						<Input.Wrapper>
							<Input.Content
								type="date"
								name="paid_at"
								value={paid_at}
								onChange={(e) => setPaidAt(e.target.value)}
							/>
						</Input.Wrapper>
					</Input.Root>

					<div>
						<div>
							<input type="radio" id="received" name="type" value="received" />
							<label htmlFor="received" className="">
								Recebida
							</label>
						</div>
						<div>
							<input type="radio" id="sent" name="type" value="sent" />
							<label htmlFor="sent" className="">
								Enviada
							</label>
						</div>
					</div>

					<div>
						<label htmlFor="payment_method">
							Qual método de pagamento usado?
						</label>
						<select name="payment_method" id="payment_method">
							<option value="money">Dinheiro</option>
							<option value="PIX">Pix</option>
							<option value="credit-card">Cartão de Credito</option>
							<option value="debit-card">Cartão de Debito</option>
							<option value="bank-check">Cheque Bancário</option>
							<option value="bank-transfer">Transferência Bancaria</option>
						</select>
					</div>

					<div>
						<label htmlFor="categoryId">
							Qual categoria esta transação pertence ?
						</label>
						<select name="categoryId" id="categoryId">
							{categories.map((category: Category) => (
								<option key={category.id} value={category.id}>
									{category.name}
								</option>
							))}
						</select>
					</div>

					<Button aria-label="sign up submit" type="submit">
						Criar Transação
					</Button>
				</form>
			</main>
		</div>
	)
}
