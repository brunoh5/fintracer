import { useMutation } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import { toast } from 'sonner'

import { api } from '@/lib/axios'

export interface SignInBody {
	email: string
	password: string
}

export function signIn() {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const mutation = useMutation<void, AxiosError, SignInBody>({
		mutationFn: async (data: SignInBody) => {
			await api.post('/sessions', data)
		},
		onSuccess: () => {
			toast.success('Login realizado com sucesso')
		},
		onError: () => {
			toast.error('Credenciais invalidas')
		},
	})

	return mutation
}
