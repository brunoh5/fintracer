import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'sonner'

import { apiClient } from '@/lib/axios-client'

interface ResponseType {
	bill: {
		id: string
		dueDate: string
		logoUrl: string
		title: string
		description: string
		lastCharge: string
		amountInCents: number
		userId: string
		paid_amount: number
		paid_at: string
	}
}

interface RequestType {
	accountId?: string
	title: string
	description?: string
	dueDate: Date | string
	paid_at?: Date | string
	amount: number
	period: 'monthly' | 'only' | 'anual'
}

export function useCreateBill() {
	const queryClient = useQueryClient()

	const mutation = useMutation<ResponseType, AxiosError, RequestType>({
		mutationFn: async (data) => {
			const response = await apiClient.post('/bills', data)

			return response.data
		},
		onSuccess: () => {
			toast.success('Despesa criada')
			queryClient.invalidateQueries({ queryKey: ['bills'] })
		},
		onError: () => {
			toast.error('Erro ao criar despesa')
		},
	})

	return mutation
}
