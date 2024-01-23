import { randomUUID } from 'node:crypto'

import { faker } from '@faker-js/faker'
import { http, HttpResponse } from 'msw'

export const getAccountsMock = http.get('*/accounts', async () => {
	return HttpResponse.json({
		accounts: [
			{
				id: randomUUID(),
				type: faker.lorem.sentence(),
				bank: faker.lorem.sentence(),
				bankImgUrl: '',
				number: null,
				balance: 3500,
			},
			{
				id: randomUUID(),
				type: faker.lorem.sentence(),
				bank: faker.lorem.sentence(),
				bankImgUrl: '',
				number: null,
				balance: 3500,
			},
		],
	})
})
