import axios from 'axios'
import { getSession } from 'next-auth/react'

import { env } from '@/env'

const axiosInstance = () => {
	const defaultOptions = {
		baseURL: env.NEXT_PUBLIC_API_URL,
	}

	const instance = axios.create(defaultOptions)

	instance.interceptors.request.use(async (request) => {
		const session = await getSession()
		if (session) {
			request.headers.Authorization = `Bearer ${session.user}`
		}
		return request
	})

	instance.interceptors.response.use(
		(response) => {
			return response
		},
		(error) => {
			console.log(`error`, error)
		},
	)

	return instance
}

export const apiClient = axiosInstance()
