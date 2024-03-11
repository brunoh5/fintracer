import { NextAuthOptions } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

import { env } from '@/env'
import { api } from '@/lib/axios'

export const nextAuthOptions: NextAuthOptions = {
	providers: [
		Credentials({
			name: 'Credentials',
			credentials: {
				email: { label: 'Username', type: 'text' },
				password: { label: 'password', type: 'password' },
			},
			async authorize(credentials) {
				const { email, password } = credentials as {
					email: string
					password: string
				}

				const response = await api.post(`/sessions`, {
					email,
					password,
				})

				const { token } = response.data

				if (!token) {
					return null
				}

				return token
			},
		}),
	],
	pages: {
		signIn: '/',
		error: '/',
	},
	secret: env.NEXTAUTH_SECRET,
	session: {
		strategy: 'jwt',
		maxAge: 60 * 60 * 24, // 365 days
	},
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.user = user
			}

			return token
		},
		async session({ session, token }) {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			session.user = token.user as any
			return session
		},
	},
}
