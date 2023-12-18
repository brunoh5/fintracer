import axios from 'axios'

export const api = axios.create({
	baseURL: 'https://fintrack.serveo.net',
})
