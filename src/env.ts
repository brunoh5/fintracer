import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

const nodeEnv = z.enum(['development', 'production', 'test'])

// function requiredOnEnv(env: z.infer<typeof nodeEnv>) {
// 	return (value: any) => {
// 		if (env === process.env.NODE_ENV && !value) {
// 			return false
// 		}

// 		return true
// 	}
// }

export const env = createEnv({
	server: {
		NEXTAUTH_URL: z.string().optional(),
		NEXTAUTH_SECRET: z.string().min(1),
		API_URI: z.string().url().min(1),
	},
	client: {
		NEXT_PUBLIC_VERCEL_URL: z.string().url().min(1),
		NEXT_PUBLIC_API: z.string().url().min(1),
	},
	shared: {
		NODE_ENV: nodeEnv,
		VERCEL_ENV: z
			.enum(['production', 'preview', 'development'])
			.default('development'),
	},
	experimental__runtimeEnv: {
		NEXT_PUBLIC_API: process.env.NEXT_PUBLIC_API,
		NEXT_PUBLIC_VERCEL_URL: process.env.NEXT_PUBLIC_VERCEL_URL,
		NODE_ENV: process.env.NODE_ENV,
		VERCEL_ENV: process.env.VERCEL_ENV,
	},
})
