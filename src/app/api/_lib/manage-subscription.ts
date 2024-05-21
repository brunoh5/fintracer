import { query as q } from 'faunadb'

import { fauna } from '@/lib/fauna'
import { stripe } from '@/lib/stripe'

export async function saveSubscription(
	subscriptionId: string,
	customerId: string,
	createAction = false,
) {
	const userRef = await fauna.query(
		q.Select(
			'ref',
			q.Get(q.Match(q.Index('user_by_stripe_customer_id'), customerId)),
		),
	)

	const subscription = await stripe.subscriptions.retrieve(subscriptionId)

	const subscriptionData = {
		id: subscription.id,
		userId: userRef,
		status: subscription.status,
		price_id: subscription.items.data[0].price.id,
	}

	console.log({ userRef, subscription, subscriptionData })

	if (createAction) {
		await fauna.query(
			q.Create(q.Collection('subscriptions'), { data: subscriptionData }),
		)
	} else {
		await fauna.query(
			q.Replace(
				q.Select(
					'ref',
					q.Get(q.Match(q.Index('subscription_by_id'), subscriptionId)),
				),
				{ data: subscriptionData },
			),
		)
	}
}
