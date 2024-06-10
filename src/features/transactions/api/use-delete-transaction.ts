import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { apiClient } from '@/lib/axios-client'

export function useDeleteAccount(id?: string) {
	const queryClient = useQueryClient()

	const mutation = useMutation({
		mutationFn: async () => {
			const response = await apiClient.delete(`/transactions/${id}`)

			return response.data
		},
		onSuccess: () => {
			toast.success('Transação deletada com sucesso')
			queryClient.invalidateQueries({ queryKey: ['accounts'] })
			queryClient.invalidateQueries({ queryKey: ['transactions'] })
		},
		onError: () => {
			toast.error('Erro ao deletar transação')
		},
	})

	return mutation
}
