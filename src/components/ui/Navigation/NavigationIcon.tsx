import { ElementType } from 'react'

interface NavigationIconProps {
	icon: ElementType
	size?: number
}

export function NavigationIcon({ icon: Icon, size = 24 }: NavigationIconProps) {
	return <Icon size={size} />
}
