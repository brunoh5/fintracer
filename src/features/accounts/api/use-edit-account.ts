import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import { toast } from 'sonner'

import { api } from '@/lib/axios'

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
	bank?: string
	number?: string
	initialAmount?: number
}

export function useEditAccount(id?: string) {
	const queryClient = useQueryClient()

	const mutation = useMutation<ResponseType, AxiosError, RequestType>({
		mutationFn: async (data) => {
			const response = await api.put(`/accounts/${id}`, data)

			return response.data
		},
		onSuccess: () => {
			toast.success('Alterações realizadas com sucesso')
			queryClient.invalidateQueries({ queryKey: ['account', { id }] })
			queryClient.invalidateQueries({ queryKey: ['accounts'] })
		},
		onError: () => {
			toast.error('Erro ao alterar conta')
		},
	})

	return mutation
}
