export type Transaction = {
	id: string
	name: string
	amount: number
	date: string
	accountId: string
	bank: string
	type: 'revenue' | 'expense'
	payment_method:
		| 'MONEY'
		| 'PIX'
		| 'CREDIT_CARD'
		| 'DEBIT_CARD'
		| 'BANK_CHECK'
		| 'BANK_TRANSFER'
	category:
		| 'FOOD'
		| 'OTHERS'
		| 'HOME'
		| 'TRANSPORTATION'
		| 'ENTERTAINMENT'
		| 'SHOPPING'
}
