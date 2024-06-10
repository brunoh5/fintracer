import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'sonner'

import { apiClient } from '@/lib/axios-client'

interface ResponseType {
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

interface RequestType {
	accountId: string
	name: string
	shopName?: string
	amount: number
	created_at?: Date
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

export function useCreateTransaction() {
	const queryClient = useQueryClient()

	const mutation = useMutation<ResponseType, AxiosError, RequestType>({
		mutationFn: async (data) => {
			const response = await apiClient.post('/transactions', data)

			return response.data
		},
		onSuccess: () => {
			toast.success('Transação criada')
			queryClient.invalidateQueries({ queryKey: ['transactions'] })
			queryClient.invalidateQueries({ queryKey: ['accounts'] })
		},
		onError: () => {
			toast.error('Erro ao criar transação')
		},
	})

	return mutation
}
