import { Session } from 'next-auth'

import { api } from '@/lib/axios'

interface FetchCategoriesRequest {
	session: Session | null
	id: string
}

export interface Account {
	account: {
		id: string
		type: string
		bank: string
		bankImgUrl?: string
		number?: string
		balance: number
	}
}

export async function getAccount({ session, id }: FetchCategoriesRequest) {
	const response = await api.get<Account>(`/accounts/${id}`, {
		headers: {
			Authorization: `Bearer ${session?.user}`,
		},
	})

	return response.data.account
}
