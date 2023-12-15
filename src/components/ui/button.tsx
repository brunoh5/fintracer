import { ComponentProps } from 'react'
import { tv, VariantProps } from 'tailwind-variants'

const button = tv({
	base: 'flex items-center justify-center gap-4 rounded font-bold w-full',
	variants: {
		size: {
			default: 'py-4 px-3 w-full',
			sm: 'h-9 px-5 py-2',
			xs: 'h-8 px-4 py-1 text-xs',
			lg: 'py-3 px-2 w-[144px] text-xs',
		},
		background: {
			default: 'bg-persian-green text-white',
			off: 'bg-inherit text-black',
		},
	},
	defaultVariants: {
		size: 'default',
		background: 'default',
	},
})

export type ButtonProps = ComponentProps<'button'> &
	// eslint-disable-next-line @typescript-eslint/ban-types
	VariantProps<typeof button> & {}

export function Button({ size, className, ...props }: ButtonProps) {
	return (
		<button className={button({ size, className })} {...props}>
			{props.children}
		</button>
	)
}
