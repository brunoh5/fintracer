import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'sonner'

import { apiClient } from '@/lib/axios-client'

interface ResponseType {
	transaction: {
		id: string
		accountId: string
		name: string
		shopName: string
		amount: number
		transaction_type: 'DEBIT' | 'CREDIT'
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
}

interface RequestType {
	accountId: string
	name: string
	shopName?: string
	amount: number
	created_at?: Date
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
	const queryClient = useQueryClient()

	const mutation = useMutation<ResponseType, AxiosError, RequestType>({
		mutationFn: async (data) => {
			const response = await apiClient.put(`/transactions/${id}`, data)

			return response.data
		},
		onSuccess: (data) => {
			toast.success('Alterações realizadas com sucesso')
			queryClient.invalidateQueries({ queryKey: ['transaction', { id }] })
			queryClient.invalidateQueries({ queryKey: ['transactions'] })
			queryClient.invalidateQueries({
				queryKey: ['account', { id: data.transaction.accountId }],
			})
			queryClient.invalidateQueries({ queryKey: ['accounts'] })
		},
		onError: () => {
			toast.error('Erro ao alterar essa transação')
		},
	})

	return mutation
}
