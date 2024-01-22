import { http, HttpResponse } from 'msw'

type SignInRequest = {
	email: string
	password: string
}

export const signInMock = http.post<never, SignInRequest>(
	'http://localhost:3333/sessions',
	async ({ request }) => {
		const { email, password } = await request.json()

		if (email === 'admin@fintracer.com.br' && password === '123456') {
			return HttpResponse.json({
				token: 'mock-token',
			})
		}

		return new HttpResponse(null, { status: 401 })
	},
)
