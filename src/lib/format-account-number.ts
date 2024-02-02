export function formatAccountNumber(value: string): string {
	const accountNumber = value?.replace(/\D/g, '')
	return accountNumber.replace(/(\d{4})(\d{4})(\d{4})(\d{4})/g, '$1 $2 $3 $4')
}
