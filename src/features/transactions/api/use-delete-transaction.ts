import { apiClient } from '@lib/axios-client'
import { queryClient } from '@lib/react-query'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

export function useDeleteTransaction() {
	const mutation = useMutation({
		mutationFn: async (id: string) => {
			const response = await apiClient.delete(`/transactions/${id}`)

			return response.data
		},
		onSuccess: (data) => {
			console.log(data)
			toast.success('Transação deletada com sucesso')
			queryClient.invalidateQueries({
				queryKey: ['accounts', { id: data.accountId }],
			})
			queryClient.invalidateQueries({ queryKey: ['transactions'] })
		},
		onError: () => {
			toast.error('Erro ao deletar transação')
		},
	})

	return mutation
}
