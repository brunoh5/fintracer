import { ChevronDown } from 'lucide-react'

export function Statistics() {
  return (
    <div className="h-[298px] w-full">
      <h2 className="mb-2 text-[22px] text-gray-500">Statistics</h2>
      <div className="flex w-full flex-col gap-3 rounded-lg bg-white px-6 pb-5 pt-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 font-bold text-eerie-black-900">
            <span>Weekly Comparison</span>
            <ChevronDown />
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="h-2 w-4 rounded-sm bg-persian-green" />
              <span className="text-xs font-medium text-gray-900">
                This Week
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-4 rounded-sm bg-gray-100" />
              <span className="text-xs font-medium text-gray-900">
                Last Week
              </span>
            </div>
          </div>
        </div>

        <div className="flex h-[184px]  bg-persian-green">
          <p>Bar Graph</p>
        </div>
      </div>
    </div>
  )
}
