import { fakerPT_BR as faker } from '@faker-js/faker'
import { http, HttpResponse } from 'msw'

export const getAccountsMock = http.get(
	'http://localhost:3333/accounts',
	async () => {
		return HttpResponse.json({
			accounts: [
				{
					id: faker.string.uuid(),
					type: faker.lorem.sentence(3),
					bank: faker.lorem.sentence(3),
					bankImgUrl: '',
					number: null,
					balance: 3500,
				},
				{
					id: faker.string.uuid(),
					type: faker.lorem.sentence(3),
					bank: faker.lorem.sentence(3),
					bankImgUrl: '',
					number: null,
					balance: 3500,
				},
			],
		})
	},
)
