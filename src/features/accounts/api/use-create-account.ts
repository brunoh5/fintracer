import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'sonner'

import { apiClient } from '@/lib/axios-client'

interface ResponseType {
	account: {
		id: string
		type:
			| 'CURRENT_ACCOUNT'
			| 'MACHINE_ACCOUNT'
			| 'INVESTMENT_ACCOUNT'
			| 'SAVINGS_ACCOUNT'
		bank: string
		number?: string
		balance: number
	}
}

interface RequestType {
	type?:
		| 'CURRENT_ACCOUNT'
		| 'MACHINE_ACCOUNT'
		| 'INVESTMENT_ACCOUNT'
		| 'SAVINGS_ACCOUNT'
	bank: string
	number?: string
	initialAmount?: number
}

export function useCreateAccount() {
	const queryClient = useQueryClient()

	const mutation = useMutation<ResponseType, AxiosError, RequestType>({
		mutationFn: async (data) => {
			const response = await apiClient.post('/accounts', data)

			return response.data
		},
		onSuccess: () => {
			toast.success('Conta criada')
			queryClient.invalidateQueries({ queryKey: ['accounts'] })
		},
		onError: () => {
			toast.error('Erro ao criar conta')
		},
	})

	return mutation
}
