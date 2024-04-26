'use client'
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller } from 'react-hook-form'

import { Input } from './ui/input'

type PriceInputProps = {
	name: string
	control: any
}

export function PriceInput({ ...rest }: PriceInputProps) {
	function formatCurrency(value: any) {
		if (!value) {
			return
		}
		const numberValue = value.replace(/[^\d]/g, '')
		return (numberValue / 100).toLocaleString('pt-BR', {
			style: 'currency',
			currency: 'BRL',
		})
	}

	return (
		<Controller
			{...rest}
			render={({ field: { name, onChange, value } }) => (
				<Input
					name={name}
					id={name}
					value={formatCurrency(value)}
					onChange={(e) => onChange(e.target.value.replace(/[^\d]/g, ''))}
				/>
			)}
		/>
	)
}
