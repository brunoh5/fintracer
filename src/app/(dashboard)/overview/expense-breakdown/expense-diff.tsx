import { ArrowDown, ArrowUp, Minus } from 'lucide-react'

interface ExpenseDiffProps {
	diffBetweenMonth: number
}

export function ExpenseDiff({ diffBetweenMonth }: ExpenseDiffProps) {
	return (
		<div className="flex items-center gap-2">
			<span className="text-xs text-muted-foreground">{diffBetweenMonth}%</span>
			{diffBetweenMonth > 0 && <ArrowUp className="text-primary" size={16} />}

			{diffBetweenMonth < 0 && <ArrowDown className="text-primary" size={16} />}

			{diffBetweenMonth === 0 && <Minus className="text-primary" size={16} />}
		</div>
	)
}
