import axios from 'axios'
import { Session } from 'next-auth'
import { getSession } from 'next-auth/react'

import { env } from '@/env'

const axiosInstance = () => {
	const defaultOptions = {
		baseURL: env.NEXT_PUBLIC_API_URL,
	}

	let session: Session | null

	const instance = axios.create(defaultOptions)

	instance.interceptors.request.use(async (request) => {
		if (!session) {
			session = await getSession()
		}

		request.headers.Authorization = `Bearer ${session?.access_token}`

		return request
	})

	instance.interceptors.response.use(
		(response) => {
			return response
		},
		(error) => {
			console.error(`error`, error)
		},
	)

	return instance
}

export const apiClient = axiosInstance()
