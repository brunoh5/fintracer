// import axios from 'axios'

// export function getAPIClient() {
// 	const api = axios.create({
// 		baseURL: 'https://fintrack.serveo.net',
// 	})

// 	api.interceptors.request.use((config) => {
// 		return config
// 	})

// 	return api
// }

import axios from 'axios'
import { useSession } from 'next-auth/react'

const getInstance = (token: string) => {
	const axiosApiInstance = axios.create()

	axiosApiInstance.interceptors.request.use(
		(config) => {
			if (token) {
				config.headers.common = {
					Authorization: `Bearer ${token}`,
				}
			}
			return config
		},
		(error) => {
			Promise.reject(error)
		},
	)

	return axiosApiInstance
}

export function useAxios() {
	const { data: session } = useSession()
	const token = session?.user as string
	return getInstance(token)
}
