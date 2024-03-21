import { TransactionsList } from './transactions-list'

export default function Transactions() {
	return (
		<main className="flex flex-col gap-4 pb-8 pl-6 pr-8 pt-4">
			<h2 className="text-[22px] text-foreground">Transações</h2>

			<TransactionsList />
		</main>
	)
}
