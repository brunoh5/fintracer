'use client'

import { Search } from 'lucide-react'
import { useRef } from 'react'

export function SearchInput() {
	const searchRef = useRef<HTMLInputElement>(null)

	async function handleSearch() {
		console.log(searchRef.current?.value)
	}

	return (
		<div className="relative mt-2 w-full rounded-md shadow-sm">
			<input
				type="text"
				className="block w-full rounded-xl border-0 py-3 pl-7 pr-20 leading-[22px]  text-gray-900 ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-special-gray-500 focus:placeholder:text-special-gray-500"
				id="search"
				autoComplete="off"
				ref={searchRef}
			/>

			<button
				type="button"
				onClick={handleSearch}
				className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3"
			></button>
		</div>
	)
}
