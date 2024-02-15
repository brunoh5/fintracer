/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentProps } from 'react'
import { Controller } from 'react-hook-form'

import {
	Select,
	SelectContent,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'

type ControlledSelectProps = ComponentProps<'select'> & {
	name: string
	control: any
	defaultValue?: any
	className?: string
	placeholder?: string
}

export function ControlledSelect({
	name,
	control,
	defaultValue,
	placeholder = '',
	className,
	children,
}: ControlledSelectProps) {
	return (
		<Controller
			name={name}
			defaultValue={defaultValue}
			control={control}
			render={({ field: { name, onChange, value, disabled } }) => {
				return (
					<Select
						name={name}
						onValueChange={onChange}
						value={value}
						disabled={disabled}
					>
						<SelectTrigger className={cn('overflow-hidden', className)}>
							<SelectValue placeholder={placeholder} />
						</SelectTrigger>
						<SelectContent>{children}</SelectContent>
					</Select>
				)
			}}
		/>
	)
}
