import { Client } from 'faunadb'

import { env } from '@/env'

export const fauna = new Client({
	secret: env.FAUNADB_KEY,
})
