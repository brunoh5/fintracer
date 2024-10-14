import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Search } from 'lucide-react'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

import { PriceInput } from '@/components/price-input'
import { Button } from '@/components/ui/button'
import { DatePicker } from '@/components/ui/date-picker'
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { TableCell, TableRow } from '@/components/ui/table'
import { useFetchAccounts } from '@/features/accounts/api/use-fetch-accounts'
import type { AccountProps } from '@/types'
import { formatCurrency } from '@/utils/price-formatter'

interface BillTableRowProps {
	bill: {
		id: string
		dueDate: string
		logoUrl: string
		title: string
		description: string
		lastCharge: string
		amount: number
		userId: string
		paid_at: string
	}
}

const payBillSchema = z.object({
	accountId: z.string(),
	paid_at: z.date().optional(),
	amount: z.string().optional(),
})

type PayBillSchema = z.infer<typeof payBillSchema>

export function BillTableRow({ bill }: BillTableRowProps) {
	const [isDetailsOpen, setIsDetailsOpen] = useState(false)
	const [isPayOpen, setIsPayOpen] = useState(false)

	const {
		handleSubmit,
		control,
		formState: { isSubmitting },
		reset,
	} = useForm<PayBillSchema>({
		resolver: zodResolver(payBillSchema),
		defaultValues: {
			accountId: '',
			paid_at: new Date(),
			amount: '0',
		},
	})

	const { data: accountsResponse } = useFetchAccounts()

	function handlePayBill(data: PayBillSchema) {
		console.log(data)
	}

	return (
		<TableRow>
			<TableCell>
				<Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
					<DialogTrigger asChild>
						<Button type="button" variant="outline" size="xs">
							<Search className="size-5" />
							<span className="sr-only">Detalhes da despesa</span>
						</Button>
					</DialogTrigger>

					{/* <TransactionDetails
						transactionId={transaction.id}
						open={isDetailsOpen}
					/> */}
				</Dialog>
			</TableCell>
			<TableCell>
				<div className="flex flex-col items-center rounded-lg bg-muted-foreground/10 p-2 text-center text-foreground">
					<span className="capitalize">
						{format(bill.dueDate, 'MMM', {
							locale: ptBR,
						})}
					</span>
					<span className="text-xl font-extrabold">
						{format(bill.dueDate, 'dd')}
					</span>
				</div>
			</TableCell>
			<TableCell className="space-y-1">
				<span className="font-extrabold">{bill.title}</span>
				<p className="text-justify text-sm text-muted-foreground">
					{bill.description}
				</p>
			</TableCell>
			<TableCell>
				{!bill.paid_at && (
					<div className="flex items-center gap-2">
						<div className="size-2 rounded-full bg-rose-500" />
						<span>Não pago</span>
					</div>
				)}

				{bill.paid_at && (
					<div className="flex items-center gap-2">
						<div className="size-2 rounded-full bg-emerald-500" />
						<span>Pago</span>
					</div>
				)}
			</TableCell>
			<TableCell className="text-center font-extrabold text-muted-foreground">
				{formatCurrency(bill.amount)}
			</TableCell>
			<TableCell>
				<Dialog open={isPayOpen} onOpenChange={setIsPayOpen}>
					<DialogTrigger asChild>
						<Button type="button" variant="ghost" size="xs">
							Pagar
						</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Pagar Despesa</DialogTitle>
						</DialogHeader>
						<form
							id="pay-bill-form"
							className="space-y-4"
							onSubmit={handleSubmit(handlePayBill)}
						>
							<Controller
								name="accountId"
								control={control}
								render={({ field: { name, onChange, value, disabled } }) => {
									return (
										<Select
											name={name}
											onValueChange={onChange}
											value={value}
											disabled={disabled}
										>
											<SelectTrigger className="h-8">
												<SelectValue placeholder="Selecione a conta para pagamento" />
											</SelectTrigger>
											<SelectContent>
												{accountsResponse?.accounts?.map(
													(account: AccountProps) => (
														<SelectItem key={account.id} value={account.id}>
															{account.bank}
														</SelectItem>
													)
												)}
											</SelectContent>
										</Select>
									)
								}}
							/>

							<Controller
								name="paid_at"
								control={control}
								render={({ field: { onChange, value } }) => {
									return (
										<div className="flex items-center gap-4">
											<DatePicker
												date={value}
												onDateChange={onChange}
												className="w-full"
											/>
											<Button
												type="button"
												onClick={() => reset({ paid_at: new Date() })}
											>
												Limpar data
											</Button>
										</div>
									)
								}}
							/>

							<div className="space-y-2">
								<Label htmlFor="amount">
									Especificar valor se for diferente
								</Label>
								<PriceInput name="amount" control={control} />
							</div>
						</form>

						<DialogFooter className="flex items-center justify-end">
							<DialogClose asChild>
								<Button
									type="button"
									form="pay-bill-form"
									variant="destructive"
									disabled={isSubmitting}
									onClick={() => {
										reset({
											accountId: '',
											paid_at: new Date(),
											amount: '0',
										})
									}}
								>
									Cancelar
								</Button>
							</DialogClose>

							<Button
								type="submit"
								form="pay-bill-form"
								disabled={isSubmitting}
							>
								Pagar
							</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</TableCell>
		</TableRow>
	)
}
