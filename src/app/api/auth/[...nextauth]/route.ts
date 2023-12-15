import { api } from '@/services/api'
import NextAuth, { NextAuthOptions } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

const nextAuthOptions: NextAuthOptions = {
	providers: [
		Credentials({
			name: 'login',
			credentials: {
				email: { label: 'Username', type: 'text' },
				password: { label: 'password', type: 'password' },
			},
			async authorize(credentials) {
				const { email, password } = credentials as {
					email: string
					password: string
				}

				const response = await api.post('/sessions', { email, password })

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
	},
	// callbacks: {
	// 	async jwt({ token }) {
	// 		console.log(token)
	// 		return token
	// 	},
	// 	async session({ session, token }) {
	// 		if (token) {
	// 			session.jwt = token
	// 		}
	// 		return session
	// 	},
	// },
}

const handler = NextAuth(nextAuthOptions)

export { handler as GET, handler as POST, nextAuthOptions }
