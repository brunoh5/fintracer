'use client'

import { Search } from 'lucide-react'
import { useRef } from 'react'

export function SearchInput() {
	const searchRef = useRef<HTMLInputElement>(null)

	async function handleSearch() {
		console.log(searchRef.current?.value)
	}

	return (
		<div className="relative mt-2 rounded-md shadow-sm w-full">
			<input
				type="text"
				className="block w-full rounded-xl border-0 py-3 text-gray-900 ring-1 ring-inset  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-special-gray-500 leading-[22px] focus:placeholder:text-special-gray-500 pl-7 pr-20"
				id="search"
				autoComplete="off"
				ref={searchRef}
			/>

			<button
				type="button"
				onClick={handleSearch}
				className="pointer-events-none absolute inset-y-0 flex items-center right-0 pr-3"
			>
				<Search size={24} className="text-[#999DA3]" />
			</button>
		</div>
	)
}
