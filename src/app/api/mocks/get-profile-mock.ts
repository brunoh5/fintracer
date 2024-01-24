import { fakerPT_BR as faker } from '@faker-js/faker'
import { http, HttpResponse } from 'msw'

export const getProfileMock = http.get('http://localhost:3333/me', async () => {
	return HttpResponse.json({
		user: {
			name: faker.person.firstName('male'),
		},
	})
})
