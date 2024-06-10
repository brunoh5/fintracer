import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

const nodeEnv = z.enum(['development', 'production', 'test'])

export const env = createEnv({
	server: {
		NEXTAUTH_URL: z.string().optional(),
		NEXTAUTH_SECRET: z.string().min(1),
		FAUNADB_KEY: z.string(),
		STRIPE_API_KEY: z.string(),
		STRIPE_SUCCESS_URL: z.string(),
		STRIPE_CANCEL_URL: z.string(),
	},
	client: {
		NEXT_PUBLIC_VERCEL_URL: z.string().min(1),
		NEXT_PUBLIC_STRIPE_PUBLIC_KEY: z.string(),
	},
	shared: {
		NODE_ENV: nodeEnv,
		VERCEL_ENV: z
			.enum(['production', 'preview', 'development'])
			.default('development'),
		NEXT_PUBLIC_API_URL: z.string(),
		NEXT_PUBLIC_STRIPE_WEBHOOK_SECRET: z.string(),
		NEXT_PUBLIC_MAINTENANCE_MODE: z.string().default('false'),
	},
	experimental__runtimeEnv: {
		NEXT_PUBLIC_STRIPE_WEBHOOK_SECRET:
			process.env.NEXT_PUBLIC_STRIPE_WEBHOOK_SECRET,
		NEXT_PUBLIC_VERCEL_URL: process.env.NEXT_PUBLIC_VERCEL_URL,
		NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
		NEXT_PUBLIC_STRIPE_PUBLIC_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY,
		NODE_ENV: process.env.NODE_ENV,
		VERCEL_ENV: process.env.VERCEL_ENV,
		NEXT_PUBLIC_MAINTENANCE_MODE: process.env.NEXT_PUBLIC_MAINTENANCE_MODE,
	},
})
