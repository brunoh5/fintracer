import { apiBackend } from '@/lib/axios-backend'

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
	await apiBackend.post('/users', {
		email,
		name,
		password,
	})
}
