'use client'

import { Input } from '@/components/input'
import { X } from 'lucide-react'
import { SyntheticEvent, useRef, useState } from 'react'

export function NewBillForm() {
	const [isVisible, setIsVisible] = useState(false)

	const supplierRef = useRef<HTMLInputElement>(null)
	const originalDueDateRef = useRef<HTMLInputElement>(null)
	const dueDateRef = useRef<HTMLInputElement>(null)
	const amountRef = useRef<HTMLInputElement>(null)
	const emissionDateRef = useRef<HTMLInputElement>(null)
	const documentNumberRef = useRef<HTMLInputElement>(null)
	const paymentDayOrderRef = useRef<HTMLInputElement>(null)
	const descriptionRef = useRef<HTMLTextAreaElement>(null)
	const paymentMethodRef = useRef<HTMLSelectElement>(null)
	const carrierRef = useRef<HTMLSelectElement>(null)
	const occurrenceRef = useRef<HTMLSelectElement>(null)

	function handleCreateBill(e: SyntheticEvent) {
		e.preventDefault()

		const data = {
			supplier: supplierRef.current?.value,
			originalDueDate: originalDueDateRef.current?.value ?? null,
			dueDate: dueDateRef.current?.value,
			amount: amountRef.current?.value,
			emissionDate: emissionDateRef.current?.value ?? null,
			documentNumber: documentNumberRef.current?.value ?? null,
			paymentDayOrder: paymentDayOrderRef.current?.value ?? null,
			description: descriptionRef.current?.value ?? null,
			paymentMethod: paymentMethodRef.current?.value ?? null,
			carrier: carrierRef.current?.value ?? null,
			occurrence: occurrenceRef.current?.value ?? null,
		}

		console.log(data)
	}

	return (
		<>
			<button type="button" onClick={() => setIsVisible(!isVisible)}>
				Adicionar nova conta
			</button>

			<div
				className="z-10 absolute hidden bg-gray-950/20 bottom-0 left-0 right-0 top-0 items-center justify-center transition-all data-[active=true]:flex"
				role="dialog"
				aria-modal="true"
				data-active={isVisible}
			>
				<div className="relative rounded-2xl bg-white px-16 pt-16 pb-12 w-full max-w-[568px]">
					<form onSubmit={handleCreateBill} className="flex flex-col w-full">
						<div className="flex space-between align-center w-full">
							{/* Header */}
							<h6 className="font-bold text-xl">Conta a pagar</h6>
							<button
								type="button"
								onClick={() => setIsVisible(!isVisible)}
								className="hover:text-red-700 transition-colors flex items-center"
							>
								<X />
							</button>
						</div>
						<p className="font-bold">
							<span className="text-red-700">(*)</span> Campos obrigatórios
						</p>

						<fieldset className="flex flex-col gap-2">
							<div>
								<label htmlFor="supplier" className="font-bold">
									Fornecedor<span className="text-red-700">*</span>
								</label>
								<Input
									type="text"
									ref={supplierRef}
									id="supplier"
									placeholder="Nome do fornecedor"
								/>
							</div>

							<div className="grid grid-cols-3 gap-x-4">
								<div>
									<label htmlFor="original_due_date" className="font-bold">
										Venc. original
									</label>
									<Input
										type="date"
										ref={originalDueDateRef}
										id="original_due_date"
									/>
								</div>

								<div>
									<label htmlFor="due_date" className="font-bold">
										Vencimento<span className="text-red-700">*</span>
									</label>
									<Input type="date" ref={dueDateRef} id="due_date" />
								</div>

								<div>
									<label htmlFor="amount" className="font-bold">
										Valor(R$)<span className="text-red-700">*</span>
									</label>
									<Input type="text" ref={amountRef} id="amount" />
								</div>

								<div>
									<label htmlFor="emission-date" className="font-bold">
										Data da emissão
									</label>
									<Input type="date" ref={emissionDateRef} id="emission-date" />
								</div>

								<div>
									<label htmlFor="document-number" className="font-bold">
										N° documento
									</label>
									<Input
										type="text"
										ref={documentNumberRef}
										id="document-number"
									/>
								</div>

								<div>
									<label htmlFor="payment-day-order" className="font-bold">
										Competência
									</label>
									<Input
										type="date"
										ref={paymentDayOrderRef}
										id="payment-day-order"
									/>
								</div>
							</div>
							<div className="flex flex-col">
								<label htmlFor="description" className="font-bold">
									Descrição
								</label>
								<textarea
									ref={descriptionRef}
									id="description"
									className="w-full h-full max-h-20 resize-none"
								/>
							</div>

							<div className="grid grid-cols-3 gap-x-4">
								<div>
									<label htmlFor="payment_method" className="font-bold">
										Forma de pagamento
									</label>
									<select
										ref={paymentMethodRef}
										id="payment_method"
										className=""
									>
										<option value="">Selecione</option>
										<option value="money">Dinheiro</option>
										<option value="PIX">Pix</option>
										<option value="credit-card">Cartão de Credito</option>
										<option value="debit-card">Cartão de Debito</option>
										<option value="bank-check">Cheque Bancário</option>
										<option value="bank-transfer">
											Transferência Bancaria
										</option>
									</select>
								</div>

								<div>
									<label htmlFor="carrier" className="font-bold">
										Portador
									</label>
									<select ref={carrierRef} id="carrier">
										<option value="">Selecione</option>
									</select>
								</div>

								<div>
									<label htmlFor="categoryId" className="font-bold">
										Categoria
									</label>
									<select id="categoryId">
										<option value="">Selecione</option>
									</select>
								</div>

								<div>
									<label htmlFor="period" className="font-bold">
										Ocorrência
									</label>
									<select ref={occurrenceRef} id="occurrence">
										<option value="">Selecione</option>
										<option value="only">Única</option>
										<option value="monthly">Mensal</option>
										<option value="anual">Anual</option>
									</select>
								</div>
							</div>
						</fieldset>
					</form>
				</div>
			</div>
		</>
	)
}
