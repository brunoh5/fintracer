import { fakerPT_BR as faker } from '@faker-js/faker'
import { http, HttpResponse } from 'msw'

export const fetchCategoriesMock = http.get(
	'http://localhost:3333/categories',
	async () => {
		return HttpResponse.json({
			categories: [
				{
					id: faker.string.uuid(),
					name: faker.lorem.sentence(),
				},
				{
					id: faker.string.uuid(),
					name: faker.lorem.sentence(),
				},
				{
					id: faker.string.uuid(),
					name: faker.lorem.sentence(),
				},
				{
					id: faker.string.uuid(),
					name: faker.lorem.sentence(),
				},
				{
					id: faker.string.uuid(),
					name: faker.lorem.sentence(),
				},
				{
					id: faker.string.uuid(),
					name: faker.lorem.sentence(),
				},
			],
		})
	},
)
