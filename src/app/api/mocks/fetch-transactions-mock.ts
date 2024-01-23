import { randomUUID } from 'node:crypto'

import { faker } from '@faker-js/faker'
import { http, HttpResponse } from 'msw'

export const fetchTransactionsMock = http.get('*/transactions', async () => {
	return HttpResponse.json({
		categories: [
			{
				id: randomUUID(),
				name: faker.lorem.sentence(),
				amount: 3500,
				categoryId: randomUUID(),
				created_at: new Date(),
				paid_at: null,
				payment_method: 'money',
				shopName: faker.lorem.sentence(),
				status: 'pending',
				type: 'received',
				category: {
					id: randomUUID(),
					name: faker.lorem.sentence(),
				},
				userId: randomUUID(),
				accountId: randomUUID(),
			},
			{
				id: randomUUID(),
				name: faker.lorem.sentence(),
				amount: 3500,
				categoryId: randomUUID(),
				created_at: new Date(),
				paid_at: null,
				payment_method: 'money',
				shopName: faker.lorem.sentence(),
				status: 'pending',
				type: 'received',
				category: {
					id: randomUUID(),
					name: faker.lorem.sentence(),
				},
				userId: randomUUID(),
				accountId: randomUUID(),
			},
		],
	})
})
