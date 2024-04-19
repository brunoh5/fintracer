import {
	Car,
	Clapperboard,
	Home,
	LayoutDashboard,
	ShoppingBag,
	Utensils,
} from 'lucide-react'
import { ReactNode } from 'react'

export type TransactionCategory =
	| 'FOOD'
	| 'OTHERS'
	| 'HOME'
	| 'TRANSPORTATION'
	| 'ENTERTAINMENT'
	| 'SHOPPING'

interface TransactionCategoryProps {
	category: TransactionCategory
}

// const transactionCategoryMap: Record<TransactionCategory, string> = {
// 	FOOD: 'Alimentação',
// 	OTHERS: 'Outros',
// 	HOME: 'Moradia',
// 	TRANSPORTATION: 'Transporte',
// 	ENTERTAINMENT: 'Entretenimento',
// 	SHOPPING: 'Compras',
// }

const transactionCategoryIconMap: Record<TransactionCategory, ReactNode> = {
	FOOD: <Utensils className="size-5" />,
	TRANSPORTATION: <Car className="size-5" />,
	ENTERTAINMENT: <Clapperboard className="size-5" />,
	SHOPPING: <ShoppingBag className="size-5" />,
	OTHERS: <LayoutDashboard className="size-5" />,
	HOME: <Home className="size-5" />,
}

export function TransactionCategory({ category }: TransactionCategoryProps) {
	return (
		<span>{transactionCategoryIconMap[category]}</span>
		// <div className="flex items-center gap-2">
		// 	{transactionCategoryIconMap[category]}
		// 	<span className="font-medium text-muted-foreground">
		// 		{transactionCategoryMap[category]}
		// 	</span>
		// </div>
	)
}
