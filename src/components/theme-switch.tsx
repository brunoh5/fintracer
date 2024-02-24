'use client'

import { MoonIcon, SunIcon } from 'lucide-react'
import { useTheme } from 'next-themes'

import { Label } from './ui/label'
import { Switch } from './ui/switch'

export function ThemeSwitch() {
	const { setTheme, resolvedTheme } = useTheme()

	return (
		<div className="flex items-center justify-center gap-4">
			<Label htmlFor="theme-switcher">
				<SunIcon className="size-[1.2rem]" />
			</Label>
			<Switch
				id="theme-switcher"
				onCheckedChange={() =>
					setTheme(resolvedTheme === 'light' ? 'dark' : 'light')
				}
				checked={resolvedTheme === 'dark'}
			/>
			<Label htmlFor="theme-switcher">
				<MoonIcon className="size-[1.2rem]" />
			</Label>
			<span className="sr-only">Mudar o tema</span>
		</div>
	)
}
