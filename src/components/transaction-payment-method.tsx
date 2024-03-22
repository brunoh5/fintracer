export type TransactionPaymentMethod =
	| 'MONEY'
	| 'PIX'
	| 'CREDIT_CARD'
	| 'DEBIT_CARD'
	| 'BANK_CHECK'
	| 'BANK_TRANSFER'

const paymentMethodsMap: Record<TransactionPaymentMethod, string> = {
	MONEY: 'Dinheiro',
	PIX: 'Pix',
	CREDIT_CARD: 'Cartão de credito',
	DEBIT_CARD: 'Cartão de debito',
	BANK_CHECK: 'Cheque bancário',
	BANK_TRANSFER: 'Transferência bancária',
}

interface TransactionPaymentMethodProps {
	paymentMethods: TransactionPaymentMethod
}

export function TransactionPaymentMethod({
	paymentMethods,
}: TransactionPaymentMethodProps) {
	return <span>{paymentMethodsMap[paymentMethods]}</span>
}
