import { useMutation } from '@tanstack/react-query'
import type { AxiosError } from 'axios'

import { api } from '@/lib/axios'

export function signOut() {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const mutation = useMutation<void, AxiosError, void>({
		mutationFn: async () => {
			await api.post('/signOut')
		},
	})

	return mutation
}
