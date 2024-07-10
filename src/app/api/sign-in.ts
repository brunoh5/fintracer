import { api } from '@/lib/axios'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'sonner'

export interface SignInBody {
	email: string
	password: string
}

export function signIn() {
	const mutation = useMutation<void, AxiosError, SignInBody>({
		mutationFn: async (data: SignInBody) => {
			await api.post('/sessions', data)
		},
		onSuccess: () => {
			toast.success('Login realizado com sucesso')
		},
		onError: () => {
			toast.error('Credenciais invalidas')
		}
	})

	return mutation
}