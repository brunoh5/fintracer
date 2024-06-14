import { apiClient } from '@lib/axios-client'
import { queryClient } from '@lib/react-query'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'sonner'

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

export function useCreateTransaction() {
	const mutation = useMutation<ResponseType, AxiosError, RequestType>({
		mutationFn: async (data) => {
			const response = await apiClient.post('/transactions', data)

			return response.data
		},
		onSuccess: (data) => {
			toast.success('Transação criada')
			queryClient.invalidateQueries({ queryKey: ['transactions'] })
			queryClient.invalidateQueries({
				queryKey: ['account', { id: data.accountId }],
			})
		},
		onError: () => {
			toast.error('Erro ao criar transação')
		},
	})

	return mutation
}
