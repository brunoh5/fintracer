// import { query as q } from 'faunadb'
// import { NextResponse } from 'next/server'
// import { getServerSession } from 'next-auth'

// import { env } from '@/env'
// import { fauna } from '@/lib/fauna'
// import { stripe } from '@/lib/stripe'

// type User = {
// 	ref: {
// 		id: string
// 	}
// 	data: {
// 		stripe_customer_id: string
// 	}
// }

// export async function POST() {

// 	if (!session?.user?.email) {
// 		return
// 	}

// 	const user = await fauna.query<User>(
// 		q.Get(q.Match(q.Index('user_by_email'), q.Casefold(session.user.email))),
// 	)

// 	let customerId = user.data.stripe_customer_id

// 	if (!customerId) {
// 		const stripeCustomer = await stripe.customers.create({
// 			email: session.user.email,
// 		})

// 		await fauna.query(
// 			q.Update(q.Ref(q.Collection('users'), user.ref.id), {
// 				data: {
// 					stripe_customer_id: stripeCustomer.id,
// 				},
// 			}),
// 		)

// 		customerId = stripeCustomer.id
// 	}

// 	const stripeCheckoutSession = await stripe.checkout.sessions.create({
// 		customer: customerId,
// 		payment_method_types: ['card'],
// 		billing_address_collection: 'auto',
// 		line_items: [{ price: 'price_1OtLjjBZQhTW9tvmeaGRRfKk', quantity: 1 }],
// 		mode: 'subscription',
// 		allow_promotion_codes: true,
// 		success_url: env.STRIPE_SUCCESS_URL,
// 		cancel_url: env.STRIPE_CANCEL_URL,
// 	})

// 	return NextResponse.json(
// 		{ sessionId: stripeCheckoutSession.id },
// 		{ status: 200 },
// 	)
// }
