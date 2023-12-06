import axios, { AxiosError, isAxiosError } from 'axios'

// const api = axios.create({
// 	baseURL: env.NODE_ENV === 'development' ? 'api' : 'http://localhost:3333',
// })

const api = axios.create({
	baseURL: 'https://adf70be9015578b07f84efabfe15ea36.serveo.net',
})

export { AxiosError, api, isAxiosError }

