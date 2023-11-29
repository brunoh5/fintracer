'use client'

import dayJs from 'dayjs'
import { Edit3, Goal, Medal, X } from 'lucide-react'

import { useState } from 'react'
import { Input } from '../../../components/ui/Input'
import { Button } from '../../../components/ui/button'

export function MonthlyGoal() {
  const [isModalActive, setIsModalActive] = useState(false)

  return (
    <div className="w-full">
      <h2 className="mb-2 text-[22px] text-gray-500">Goals</h2>
      <div className="flex h-[232px] flex-col gap-5 rounded-lg bg-white px-6 py-5">
        <div className="flex items-center justify-between border-b border-[#F3F3F3] pb-3">
          <div className="flex items-center gap-2">
            <span className="text-[22px] font-bold text-eerie-black-900">
              $20,000
            </span>
            <button
              className="bg-[#D2D2D2]/25 p-1"
              onClick={() => setIsModalActive(true)}
              aria-label="open goal modal"
            >
              <Edit3 size={16} className="text-gray-900" />
            </button>
          </div>
          <p className="text-xs text-gray-900">{dayJs().format('MMM, YYYY')}</p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <Medal size={16} className="text-gray-900" />
                <span className="text-xs text-gray-500">Target Achieved</span>
              </div>
              <span className="self-center font-bold">$12,500</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <Goal size={16} className="text-gray-900" />
                <span className="text-xs text-gray-500">This month Target</span>
              </div>
              <span className="self-center font-bold">$20,000</span>
            </div>
          </div>
          <div>
            <div className="h-[94px] w-[144px] bg-persian-green" />
            <span className="text-xs">Target vs Achievement</span>
          </div>
        </div>
      </div>

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

            <Input.Root>
              <Input.Label name="targetAmounts" text="Target Amounts" />
              <Input.Wrapper>
                <Input.Content
                  name="targetAmounts"
                  placeholder="$50000"
                  autoComplete="off"
                />
              </Input.Wrapper>
            </Input.Root>

            <Input.Root>
              <Input.Label name="presentAmounts" text="Present Amounts" />
              <Input.Wrapper>
                <Input.Content
                  name="presentAmounts"
                  placeholder="Write presents amounts here"
                  autoComplete="off"
                />
              </Input.Wrapper>
            </Input.Root>

            <Button aria-label="save goal" className="max-w-[192px]">
              Save
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
