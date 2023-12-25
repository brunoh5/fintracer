'use client'

import { Input } from '@/components/input'
import { Button } from '@/components/ui/button'
import { Edit3, X } from 'lucide-react'
import { useRef, useState } from 'react'

export function MonthlyGoalForm() {
	const [isModalActive, setIsModalActive] = useState(false)

	const targetAmountsRef = useRef<HTMLInputElement>(null)
	const presentAmountsRef = useRef<HTMLInputElement>(null)

	async function handleSetGoals() {
		const data = {
			targetAmounts: targetAmountsRef.current?.value,
			presentAmounts: presentAmountsRef.current?.value,
		}

		console.log(data)
	}

	return (
		<>
			<button
				className="bg-[#D2D2D2]/25 p-1"
				onClick={() => setIsModalActive(true)}
				aria-label="open goal modal"
			>
				<Edit3 size={16} className="text-gray-900" />
			</button>

			{isModalActive && (
				<div className="absolute bg-gray-950/20 bottom-0 left-0 right-0 top-0 flex items-center justify-center transition-all">
					{/* Modal */}
					<div className="relative rounded-2xl bg-white px-16 pt-16 pb-12 gap-6 flex flex-col items-center w-[488px] h-[392px]">
						<button
							className="absolute top-8 right-8 group"
							onClick={() => setIsModalActive(false)}
							aria-label="close goal modal"
						>
							<X
								size={32}
								className="text-gray-900 group-hover:text-chili-red transition-colors"
							/>
						</button>

						<form onSubmit={handleSetGoals}>
							<div>
								<label htmlFor="targetAmounts">Target Amounts</label>
								<Input
									ref={targetAmountsRef}
									id="targetAmounts"
									autoComplete="off"
								/>
							</div>

							<div>
								<label htmlFor="targetAmounts">Target Amounts</label>
								<Input
									ref={presentAmountsRef}
									id="presentAmounts"
									autoComplete="off"
									placeholder="Write presents amounts here"
								/>
							</div>
						</form>

						<Button
							type="submit"
							aria-label="save goal"
							className="max-w-[192px]"
						>
							Save
						</Button>
					</div>
				</div>
			)}
		</>
	)
}
