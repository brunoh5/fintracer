import { api } from '@/lib/axios'

interface RegisterClientBody {
	email: string
	name: string
	password: string
}

export async function registerClient({
	email,
	name,
	password,
}: RegisterClientBody) {
	await api.post('/users', {
		email,
		name,
		password,
	})
}
