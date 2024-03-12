import axios from 'axios'

import { env } from '@/env'

export const apiBackend = axios.create({
	baseURL: env.NEXT_PUBLIC_API_URL,
})
