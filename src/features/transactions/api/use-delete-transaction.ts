import { api } from '@lib/axios'
import { queryClient } from '@lib/react-query'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

export function useDeleteTransaction() {
	const mutation = useMutation({
		mutationFn: async (id: string) => {
			const response = await api.delete(`/transactions/${id}`)

			return response.data
		},
		onSuccess: data => {
			toast.success('Transação deletada com sucesso')
			queryClient.invalidateQueries({
				queryKey: ['account', { id: data.transaction.accountId }],
			})
			queryClient.invalidateQueries({ queryKey: ['transactions'] })
		},
		onError: () => {
			toast.error('Erro ao deletar transação')
		},
	})

	return mutation
}
