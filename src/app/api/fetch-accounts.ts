import { Session } from 'next-auth'

import { api } from '@/lib/axios'

interface FetchAccountsRequest {
	session: Session | null
}

export interface Accounts {
	accounts: {
		id: string
		type: string
		bank: string
		bankImgUrl?: string
		number?: string
		balance: number
	}[]
}

export async function fetchAccounts({ session }: FetchAccountsRequest) {
	const response = await api.get<Accounts>('/accounts', {
		headers: {
			Authorization: `Bearer ${session?.user}`,
		},
	})

	return response.data.accounts
}
