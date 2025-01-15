import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import { toast } from 'sonner'

import { api } from '@/lib/axios'

interface RequestType {
	accountId: string
	id: string
	paid_at?: Date
	paid_amount?: number
}

export function usePayBill() {
	const queryClient = useQueryClient()

	const mutation = useMutation<null, AxiosError, RequestType>({
		mutationFn: async data => {
			const response = await api.patch(`/bills/${data.id}`)

			return response.data
		},
		onSuccess: () => {
			toast.success('Despesa paga com sucesso')
			queryClient.invalidateQueries({ queryKey: ['bills'] })
		},
		onError: () => {
			toast.error('Erro ao pagar despesa')
		},
	})

	return mutation
}
