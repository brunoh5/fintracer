export type TransactionProps = {
	id: string
	name: string
	amount: number
	created_at: Date
	paid_at: Date | null
	payment_method: string
	shopName: string
	transaction_type: 'DEBIT' | 'CREDIT'
	category:
		| 'FOOD'
		| 'OTHERS'
		| 'HOME'
		| 'TRANSPORT'
		| 'ENTERTAINMENT'
		| 'SHOPPING'
	userId: string
	accountId: string
}

export type AccountProps = {
	id: string
	type: string
	bank: string
	bankImgUrl?: string
	number?: string
	balance: number
}

export type UserProps = {
	name: string
	avatar_url?: string | null
}

export type BillsProps = {
	id: string
	dueDate: string
	logoUrl: string
	title: string
	description: string
	lastCharge: string
	amount: number
	userId: string
}

export type CategoryProps = {
	id: string
	name: string
}
