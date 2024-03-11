import { Session } from 'next-auth'

import { api } from '@/lib/axios'

interface FetchCategoriesRequest {
	session: Session | null
}

export interface Categories {
	categories: {
		id: string
		name: string
	}[]
}

export async function fetchCategories({ session }: FetchCategoriesRequest) {
	const response = await api.get<Categories>('/categories', {
		headers: {
			Authorization: `Bearer ${session?.user}`,
		},
	})

	return response.data.categories
}
