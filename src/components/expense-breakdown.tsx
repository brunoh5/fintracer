import { Home, ArrowUp } from 'lucide-react'
import { ExpenseItem } from './expense-item'

const expenses = [
  {
    icon: 'Home',
    title: 'Housing',
    value: '250.00',
    span: '15%*',
    statusIcon: 'ArrowUp',
    statusColor: 'red',
  },
]

export function ExpenseBreakdown() {
  return (
    <div className="h-[252px] w-full">
      <div className="flex items-center justify-between">
        <h2 className="mb-2 text-[22px] text-gray-500">Expenses Breakdown</h2>
        <span className="self-end font-medium text-gray-300">
          *Compare to last month
        </span>
      </div>

      <div className="grid w-full grid-cols-3 gap-x-10 gap-y-6 rounded-lg bg-white px-6 py-5">
        {expenses &&
          expenses.map((expense) => (
            <ExpenseItem
              key={expense.title}
              icon={Home}
              title={expense.title}
              value={expense.value}
              span={expense.span}
              statusIcon={ArrowUp}
              statusColor="red"
            />
          ))}
        {/* 
        <Expense
          icon={Utensils}
          title="Food"
          value="350.00"
          span="08%*"
          statusIcon={ArrowDown}
          statusColor="green"
        />
        <Expense
          icon={Car}
          title="Transportation"
          value="50.00"
          span="12%*"
          statusIcon={ArrowDown}
          statusColor="green"
        />
        <Expense
          icon={Clapperboard}
          title="Entertainment"
          value="80.00"
          span="15%*"
          statusIcon={ArrowDown}
          statusColor="green"
        />
        <Expense
          icon={ShoppingBag}
          title="Shopping"
          value="420.00"
          span="25%*"
          statusIcon={ArrowUp}
          statusColor="red"
        />
        <Expense
          icon={LayoutDashboard}
          title="Others"
          value="650.00"
          span="23%*"
          statusIcon={ArrowUp}
          statusColor="red"
        /> */}
      </div>
    </div>
  )
}
