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

const transactionCategoryIconMap: Record<TransactionCategory, ReactNode> = {
	FOOD: <Utensils className="size-5" />,
	TRANSPORTATION: <Car className="size-5" />,
	ENTERTAINMENT: <Clapperboard className="size-5" />,
	SHOPPING: <ShoppingBag className="size-5" />,
	OTHERS: <LayoutDashboard className="size-5" />,
	HOME: <Home className="size-5" />,
}

interface TransactionIconProps {
	category: TransactionCategory
}

export function TransactionIcon({ category }: TransactionIconProps) {
	return <div className="p-2">{transactionCategoryIconMap[category]}</div>
}
