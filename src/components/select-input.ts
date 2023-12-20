import { InputHTMLAttributes, forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

export type InputProps = InputHTMLAttributes<HTMLInputElement>

const Input = forwardRef<HTMLInputElement, InputProps>(
	({ className, type, ...props }, ref) => {
		return (
			<input
				type= { type }
		className = {
			twMerge(
					'block w-full rounded-xl border-0 py-3 text-gray-900 ring-1 ring-inset  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-special-gray-500 leading-[22px] focus:placeholder:text-special-gray-500 ring-[#D0D5DD] px-3',
				className,
			)
		}
		ref = { ref }
		{...props}
/>
		)
	},
)

Input.displayName = 'Input'

export { Input }
