import { faker } from '@faker-js/faker'
import { http, HttpResponse } from 'msw'

export const fetchCategoriesMock = http.get(
	'http://localhost:3333/categories',
	async () => {
		return HttpResponse.json({
			categories: [
				{
					id: faker.string.uuid(),
					name: 'Comida',
				},
				{
					id: faker.string.uuid(),
					name: 'Transporte',
				},
				{
					id: faker.string.uuid(),
					name: 'Entretenimento',
				},
				{
					id: faker.string.uuid(),
					name: 'Shopping',
				},
				{
					id: faker.string.uuid(),
					name: 'Outros',
				},
				{
					id: faker.string.uuid(),
					name: 'Casa',
				},
			],
		})
	},
)
