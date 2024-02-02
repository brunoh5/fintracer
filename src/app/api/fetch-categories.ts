import { Session, getServerSession } from 'next-auth'

import { api } from '@/services/api'

interface FetchCategoriesResponse {
	categories: {
		id: string
		name: string
	}[]
}

export async function fetchCategories(user: string | null) {
	// const session = await getServerSession()

	console.log(user)

	const response = await api.get<FetchCategoriesResponse>('/categories', {
		headers: {
			Authorization: `Bearer ${user}`,
		},
	})

	console.log(response)

	return response.data.categories
}
