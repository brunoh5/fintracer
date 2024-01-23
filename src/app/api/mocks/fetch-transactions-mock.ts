import { fakerPT_BR as faker } from '@faker-js/faker'
import { http, HttpResponse } from 'msw'

export const fetchTransactionsMock = http.get(
	'http://localhost:3333/users/transactions',
	async () => {
		return HttpResponse.json({
			transactions: [
				{
					id: faker.string.uuid(),
					name: faker.lorem.sentence(),
					amount: 3500,
					categoryId: faker.string.uuid(),
					created_at: new Date(),
					paid_at: null,
					payment_method: 'money',
					shopName: faker.lorem.sentence(),
					status: faker.helpers.arrayElement(['pending', 'complete']),
					type: faker.helpers.arrayElement(['received', 'sent']),
					category: {
						id: faker.string.uuid(),
						name: faker.lorem.sentence(),
					},
					userId: faker.string.uuid(),
					accountId: faker.string.uuid(),
				},
				{
					id: faker.string.uuid(),
					name: faker.lorem.sentence(),
					amount: 3500,
					categoryId: faker.string.uuid(),
					created_at: new Date(),
					paid_at: null,
					payment_method: 'money',
					shopName: faker.lorem.sentence(),
					status: faker.helpers.arrayElement(['pending', 'complete']),
					type: faker.helpers.arrayElement(['received', 'sent']),
					category: {
						id: faker.string.uuid(),
						name: faker.lorem.sentence(),
					},
					userId: faker.string.uuid(),
					accountId: faker.string.uuid(),
				},
			],
		})
	},
)
