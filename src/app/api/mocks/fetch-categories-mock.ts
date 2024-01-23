import { randomUUID } from 'node:crypto'

import { faker } from '@faker-js/faker'
import { http, HttpResponse } from 'msw'

export const fetchCategoriesMock = http.get('*/categories', async () => {
	return HttpResponse.json({
		categories: [
			{
				id: randomUUID(),
				name: faker.lorem.sentence(),
			},
			{
				id: randomUUID(),
				name: faker.lorem.sentence(),
			},
			{
				id: randomUUID(),
				name: faker.lorem.sentence(),
			},
			{
				id: randomUUID(),
				name: faker.lorem.sentence(),
			},
			{
				id: randomUUID(),
				name: faker.lorem.sentence(),
			},
			{
				id: randomUUID(),
				name: faker.lorem.sentence(),
			},
		],
	})
})
