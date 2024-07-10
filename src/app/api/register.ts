import { api } from "@lib/axios";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

type RegisterBody = {
	name: string
	email: string
	password: string
}

export function useRegister() {
	const mutation = useMutation<void, AxiosError, RegisterBody>({
		mutationFn: async (data) => {
			await api.post('/users', data)
		},
		onSuccess: () => {
			toast.success('Cadastro realizado com sucesso!')
		},
		onError: () => {
			toast.error('Erro ao se cadastrar, tente novamente mais tarde')
		}
	})

	return mutation
}