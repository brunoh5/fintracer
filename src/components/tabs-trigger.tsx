import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

import { TabsTrigger as TabsTriggerPrimitive } from './ui/tabs'

interface TabsTriggerProps extends ComponentProps<typeof TabsTriggerPrimitive> {
	className?: string
}

export function TabsTrigger({ className, ...props }: TabsTriggerProps) {
	return (
		<TabsTriggerPrimitive
			className={twMerge(
				'rounded-none border-y-2 border-transparent p-2 shadow-none',
				'data-[state=active]:border-b-primary data-[state=active]:bg-transparent data-[state=active]:text-primary',
				className,
			)}
			{...props}
		/>
	)
}
