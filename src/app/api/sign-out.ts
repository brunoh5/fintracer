import { api } from '@/lib/axios'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'

export function signOut() {
	const mutation = useMutation<void, AxiosError, void>({
		mutationFn: async () => {
			await api.post('/sign-out')
		},
	})

	return mutation
}