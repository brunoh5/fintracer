import { api } from '@lib/axios'
import { queryClient } from '@lib/react-query'
import { useMutation } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import { toast } from 'sonner'
import type { Transaction } from '../@types/Transaction'

interface ResponseType {
	transaction: Transaction
}

interface RequestType {
	accountId: string
	name: string
	amount: number
	date?: Date
	transaction_type?: 'DEBIT' | 'CREDIT'
	payment_method:
		| 'MONEY'
		| 'PIX'
		| 'CREDIT_CARD'
		| 'DEBIT_CARD'
		| 'BANK_TRANSFER'
	category:
		| 'FOOD'
		| 'HOME'
		| 'TRANSPORTATION'
		| 'OTHERS'
		| 'SHOPPING'
		| 'ENTERTAINMENT'
}

export function useEditTransaction(id?: string) {
	const mutation = useMutation<ResponseType, AxiosError, RequestType>({
		mutationFn: async data => {
			const response = await api.put(`/transactions/${id}`, data)

			return response.data
		},
		onSuccess: data => {
			toast.success('Alterações realizadas com sucesso')
			queryClient.invalidateQueries({ queryKey: ['transaction', { id }] })
			queryClient.invalidateQueries({ queryKey: ['transactions'] })
			queryClient.invalidateQueries({
				queryKey: ['account', { id: data.transaction.accountId }],
			})
		},
		onError: () => {
			toast.error('Erro ao alterar essa transação')
		},
	})

	return mutation
}
