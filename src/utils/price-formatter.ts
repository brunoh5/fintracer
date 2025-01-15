export function formatCurrency(
	price: number | string = 0,
	options: { currency?: string; locale?: string } = {}
) {
	const { currency = 'BRL', locale = 'pt-BR' } = options

	return Intl.NumberFormat(locale, {
		style: 'currency',
		currency,
	}).format(Number(price) / 100)
}
