/* eslint-disable @typescript-eslint/no-explicit-any */
import { query as q } from 'faunadb'
import { NextAuthOptions } from 'next-auth'

import { env } from '@/env'
import { fauna } from '@/lib/fauna'

import { credentialsProvider } from './credentials-provider'

export const nextAuthOptions: NextAuthOptions = {
	providers: [credentialsProvider],
	pages: {
		signIn: '/',
		error: '/',
	},
	secret: env.NEXTAUTH_SECRET,
	session: {
		strategy: 'jwt',
		maxAge: 60 * 60 * 24,
	},
	callbacks: {
		async jwt({ token }) {
			return token
		},
		async session({ session, token }) {
			Object.assign(session, {
				access_token: token.sub,
			})

			return session
		},
		async signIn(params: any) {
			const { email } = params.credentials

			try {
				await fauna.query(
					q.If(
						q.Not(
							q.Exists(q.Match(q.Index('user_by_email'), q.Casefold(email))),
						),
						q.Create(q.Collection('users'), {
							data: { email },
						}),
						q.Get(q.Match(q.Index('user_by_email'), q.Casefold(email))),
					),
				)

				return true
			} catch {
				return false
			}
		},
	},
}
