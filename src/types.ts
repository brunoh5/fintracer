export enum CategoryTypes {
	FOOD = 'FOOD',
	OTHERS = 'OTHERS',
	HOME = 'HOME',
	TRANSPORTATION = 'TRANSPORTATION',
	ENTERTAINMENT = 'ENTERTAINMENT',
	SHOPPING = 'SHOPPING',
}

export enum PaymentMethods {
	MONEY = 'MONEY',
	CREDIT_CARD = 'CREDIT_CARD',
	DEBIT_CARD = 'DEBIT_CARD',
	BANK_TRANSFER = 'BANK_TRANSFER',
	PIX = 'PIX',
}

export enum TransactionTypes {
	DEBIT = 'DEBIT',
	CREDIT = 'CREDIT',
}

export type TransactionProps = {
	id: string
	name: string
	amount: number
	created_at: Date
	payment_method: PaymentMethods
	shopName: string
	transaction_type: 'DEBIT' | 'CREDIT'
	category: CategoryTypes
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
