import { apiClient } from '@lib/axios-client'
import { queryClient } from '@lib/react-query'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

export function useDeleteAccount(id?: string) {
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
