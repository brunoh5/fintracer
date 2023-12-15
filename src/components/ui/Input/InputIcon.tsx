import { ElementType } from 'react'

interface InputIconProps {
	icon: ElementType
	position: 'left' | 'right'
	size?: number
}

export function InputIcon({ icon: Icon, position, size = 24 }: InputIconProps) {
	return (
		<div
			className={`
      pointer-events-none absolute inset-y-0 flex items-center 
      ${position === 'left' && 'left-0 pl-3'}
      ${position === 'right' && 'right-0 pr-3'}
    `}
		>
			<Icon size={size} className="text-[#999DA3]" />
		</div>
	)
}
