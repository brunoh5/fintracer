import { fetchCategoriesMock } from './fetch-categories-mock'
import { fetchTransactionsMock } from './fetch-transactions-mock'
import { getAccountsMock } from './get-accounts-mock'
import { getProfileMock } from './get-profile-mock'
import { signInMock } from './sign-in-mock'

export const handlers = [
	signInMock,
	getProfileMock,
	getAccountsMock,
	fetchTransactionsMock,
	fetchCategoriesMock,
]
