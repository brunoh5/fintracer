'use client'

import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { useRouter } from 'next/navigation'
import { getSession } from 'next-auth/react'
import { FormEvent, useRef } from 'react'

import { Header } from '@/components/header'
import { Select } from '@/components/select-input'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { api } from '@/services/api'
import { CategoryProps } from '@/types'

export default function Account({ params }: { params: { id: string } }) {
	const { toast } = useToast()
	const router = useRouter()

	const nameRef = useRef<HTMLInputElement>(null)
	const shopNameRef = useRef<HTMLInputElement>(null)
	const paidAtRef = useRef<HTMLInputElement>(null)
	const amountRef = useRef<HTMLInputElement>(null)
	const paymentMethodRef = useRef<HTMLSelectElement>(null)
	const categoryRef = useRef<HTMLSelectElement>(null)

	const { data: categories } = useQuery<CategoryProps[]>({
		queryKey: ['categories'],
		queryFn: async () => {
			const session = await getSession()

			const response = await api.get('/categories', {
				headers: {
					Authorization: `Bearer ${session?.user}`,
				},
			})

			return response.data.categories
		},
	})

	async function handleRegister(event: FormEvent<HTMLFormElement>) {
		event.preventDefault()

		const session = await getSession()

		try {
			const formData = new FormData(event.currentTarget)

			const data = {
				accountId: params.id,
				name: nameRef.current?.value,
				shopName: formData.get('shopName'),
				amount: amountRef.current?.value,
				paid_at: dayjs(paidAtRef.current?.value) || null,
				type: formData.get('type'),
				payment_method: paymentMethodRef.current?.value,
				categoryId: categoryRef.current?.value,
			}

			await api.post('/transactions', data, {
				headers: {
					Authorization: `Bearer ${session?.user}`,
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
					<div>
						<label
							htmlFor="name"
							className="block font-semibold leading-6 text-gray-900"
						>
							Nome da transação
						</label>
						<Input type="text" id="name" ref={nameRef} />
					</div>

					<div>
						<label
							htmlFor="shop_name"
							className="block font-semibold leading-6 text-gray-900"
						>
							Estabelecimento/Site
						</label>
						<Input type="text" id="shop_name" ref={shopNameRef} />
					</div>

					<div>
						<label
							htmlFor="amount"
							className="block font-semibold leading-6 text-gray-900"
						>
							Valor
						</label>
						<Input type="number" id="number" ref={amountRef} />
					</div>

					<div>
						<label
							htmlFor="paid_at"
							className="block font-semibold leading-6 text-gray-900"
						>
							Preencha caso esteja pago
						</label>
						<Input type="date" id="paid_at" ref={paidAtRef} />
					</div>

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

						<Select id="payment_method" ref={paymentMethodRef}>
							<option>Selecione</option>
							<option value="money">Dinheiro</option>
							<option value="PIX">Pix</option>
							<option value="credit-card">Cartão de Credito</option>
							<option value="debit-card">Cartão de Debito</option>
							<option value="bank-check">Cheque Bancário</option>
							<option value="bank-transfer">Transferência Bancaria</option>
						</Select>
					</div>

					<div>
						<label htmlFor="categoryId">
							Qual categoria esta transação pertence ?
						</label>

						<Select id="categoryId" ref={categoryRef}>
							{categories?.map((category: CategoryProps) => (
								<option key={category.id} value={category.id}>
									{category.name}
								</option>
							))}
						</Select>
					</div>

					<Button aria-label="sign up submit" type="submit">
						Criar Transação
					</Button>
				</form>
			</main>
		</div>
	)
}
