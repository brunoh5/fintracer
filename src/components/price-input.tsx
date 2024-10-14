'use client'

import { Controller } from 'react-hook-form'

import { formatCurrency } from '@/utils/price-formatter'
import { Input } from './ui/input'

type PriceInputProps = {
	name: string
	control: any
}

export function PriceInput({ ...rest }: PriceInputProps) {
	return (
		<Controller
			{...rest}
			render={({ field: { name, onChange, value } }) => (
				<Input
					name={name}
					id={name}
					value={formatCurrency(value)}
					onChange={e => onChange(e.target.value.replace(/[^\d]/g, ''))}
				/>
			)}
		/>
	)
}
