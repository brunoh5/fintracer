export type TransactionProps = {
	id: string
	name: string
	amount: number
	categoryId: string
	created_at: Date
	paid_at: Date | null
	payment_method: string
	shopName: string
	status: 'complete' | 'pending'
	type: 'sent' | 'received'
	category: {
		id: string
		name: string
	}
	userId: string
	accountId: string
}
