/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { CalendarIcon } from 'lucide-react'
import { ComponentProps } from 'react'
import { Control } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'

import { FormField } from './ui/form'

interface DateRangePickerProps extends ComponentProps<'div'> {
	name: string
	control: Control<any>
}

export function DateRangePicker({
	name,
	control,
	className,
}: DateRangePickerProps) {
	return (
		<FormField
			name={name}
			control={control}
			render={({ field: { value, onChange } }) => (
				<div className={cn('grid gap-2', className)}>
					<Popover>
						<PopoverTrigger asChild>
							<Button
								id="date"
								variant={'outline'}
								className={cn(
									'w-[270px] justify-start text-left font-normal',
									!value && 'text-muted-foreground',
								)}
							>
								<CalendarIcon className="mr-2 h-4 w-4" />
								{value?.from ? (
									value.to ? (
										<>
											{format(value.from, 'LLL dd, y', {
												locale: ptBR,
											})}{' '}
											-{' '}
											{format(value.to, 'LLL dd, y', {
												locale: ptBR,
											})}
										</>
									) : (
										format(value.from, 'LLL dd, y', {
											locale: ptBR,
										})
									)
								) : (
									<span>Escolha a data</span>
								)}
							</Button>
						</PopoverTrigger>
						<PopoverContent className="w-auto p-0" align="start">
							<Calendar
								mode="range"
								initialFocus
								defaultMonth={value?.from}
								selected={{ from: value.from, to: value.to }}
								onSelect={onChange}
								numberOfMonths={2}
							/>
						</PopoverContent>
					</Popover>
				</div>
			)}
		/>
	)
}
