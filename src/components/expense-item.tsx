import {
  ArrowRight,
  Home,
  ArrowUp,
  Utensils,
  ArrowDown,
  Car,
  Clapperboard,
  ShoppingBag,
  LayoutDashboard,
} from 'lucide-react'
import { ElementType } from 'react'

interface ExpenseProps {
  icon: ElementType
  title: string
  span: string
  value: string
  statusIcon: ElementType
  statusColor: 'red' | 'green'
}

export function ExpenseItem({
  icon: Icon,
  title,
  span,
  value,
  statusIcon: StatusIcon,
  statusColor,
}: ExpenseProps) {
  return (
    <div className="flex items-center justify-between px-4 py-2">
      <div className="p-2 bg-[#D2D2D2]/25 rounded-lg w-10 h-14 flex items-center">
        <Icon />
      </div>
      <div className="flex items-center gap-4">
        <div className="flex flex-col">
          <span className="text-xs text-gray-500">{title}</span>
          <p className="font-semibold">${value}</p>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-300">{span}</span>
            <StatusIcon
              size={16}
              className={`${statusColor === 'red' && 'text-chili-red'} ${
                statusColor === 'green' && 'text-persian-green'
              }`}
            />
          </div>
        </div>
        <div className="flex flex-col items-end">
          <ArrowRight />
        </div>
      </div>
    </div>
  )
}
