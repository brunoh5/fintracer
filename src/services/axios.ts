import axios from 'axios'
import { env } from 'process'
import { parseCookies } from 'nookies'
import Cookies from 'js-cookie'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getAPIClient(ctx?: any) {
	const { 'next-auth.session-token': token } = parseCookies(ctx)

	console.log(Cookies.get('nextauth.token'))
	console.log(Cookies.get('next-auth.session-token'))

	console.log({ token })

	const api = axios.create({
		baseURL: env.NEXT_PUBLIC_API,
	})

	api.interceptors.request.use((config) => {
		return config
	})

	if (token) {
		api.defaults.headers.Authorization = `Bearer ${token}`
	}

	return api
}
