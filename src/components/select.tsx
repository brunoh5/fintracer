'use client'

import { useTheme } from 'next-themes'
import { useMemo } from 'react'
import type { SingleValue } from 'react-select'
import CreatableSelect from 'react-select/creatable'

type Props = {
	value?: string | null | undefined
	disabled?: boolean
	placeholder?: string
	defaultValue?: { label?: string; value?: string } | undefined
	options?: { label: string; value: string }[]
	onChange: (value?: string) => void
	onCreate?: (value: string) => void
}

export function Select({
	value,
	disabled,
	placeholder,
	defaultValue,
	options = [],
	onChange,
	onCreate,
}: Props) {
	const { resolvedTheme } = useTheme()

	function onSelect(option: SingleValue<{ label?: string; value?: string }>) {
		onChange(option?.value)
	}

	const formattedValue = useMemo(() => {
		return options.find(option => option.value === value)
	}, [options, value])

	return (
		<CreatableSelect
			defaultValue={defaultValue}
			placeholder={placeholder}
			value={formattedValue}
			onChange={onSelect}
			options={options}
			onCreateOption={onCreate}
			isDisabled={disabled}
			formatCreateLabel={inputText => `Criar "${inputText}"`}
			className="h-10 text-sm text-white"
			styles={{
				control: base => ({
					...base,
					backgroundColor: 'transparent',
					borderColor: resolvedTheme === 'dark' ? '#27272a' : '#e4e4e7',
					focus: 'none',
					':focus-within': {
						borderColor: resolvedTheme === 'dark' ? '#15803d' : '#16a34b',
					},
					borderRadius: 4,
					outline: 'none',
				}),
				option: base => ({
					...base,
					backgroundColor: resolvedTheme === 'dark' ? '#171717' : '#ffffff',
					color: resolvedTheme === 'dark' ? '#f2f2f2' : '#09090b',
					paddingLeft: '8px',
					paddingRight: '32px',
					paddingTop: '6px',
					paddingBottom: '6px',
					borderRadius: '6px',
					':hover': {
						color: resolvedTheme === 'dark' ? '#fafafa' : '#f4f4f5',
						backgroundColor: resolvedTheme === 'dark' ? '#292524' : '#18181b',
					},
				}),
				input: base => ({
					...base,
					'& input': {
						boxShadow: 'none !important',
						outline: 'none',
					},
					color: resolvedTheme === 'dark' ? '#ffffff' : '#171717',
				}),
				menu: base => ({
					...base,
					backgroundColor: resolvedTheme === 'dark' ? '#171717' : '#ffffff',
					borderRadius: '6px',
					paddingLeft: '6px',
					paddingRight: '6px',
				}),
				placeholder: base => ({
					...base,
					color: resolvedTheme === 'dark' ? '#ffffff' : '#171717',
				}),
				singleValue: base => ({
					...base,
					color: resolvedTheme === 'dark' ? '#ffffff' : '#171717',
				}),
			}}
		/>
	)
}
