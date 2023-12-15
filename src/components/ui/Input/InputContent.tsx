import { InputHTMLAttributes } from 'react'
import { VariantProps, tv } from 'tailwind-variants'

const input = tv({
	base: 'block w-full rounded-xl border-0 py-3 text-gray-900 ring-1 ring-inset  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-special-gray-500 leading-[22px] focus:placeholder:text-special-gray-500',
	variants: {
		theme: {
			dark: 'ring-[#D0D5DD]',
			light: 'bg-white',
		},
		hasIcon: {
			default: 'px-3',
			right: 'pl-7 pr-20',
			left: 'pl-20 pr-7',
		},
	},
	defaultVariants: {
		theme: 'dark',
		hasIcon: 'default',
	},
})

export type InputProps = InputHTMLAttributes<HTMLInputElement> &
	VariantProps<typeof input> &
	object

export function InputContent({ theme, className, ...props }: InputProps) {
	return (
		<input type="text" className={input({ theme, className })} {...props} />
	)
}
