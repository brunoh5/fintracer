import axios, { AxiosError, isAxiosError } from 'axios'

// const api = axios.create({
// 	baseURL: env.NODE_ENV === 'development' ? 'api' : 'http://localhost:3333',
// })

const api = axios.create({
	baseURL: 'https://fintrack.serveo.net',
})

export { AxiosError, api, isAxiosError }
