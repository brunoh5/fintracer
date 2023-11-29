import { ExpenseBreakdown } from '@/app/(dashboard)/overview/expense-breakdown'
import { MonthlyGoal } from '@/app/(dashboard)/overview/monthly-goal'
import { RecentTransaction } from '@/app/(dashboard)/overview/recent-transaction'
import { Statistics } from '@/app/(dashboard)/overview/statistics'
import { TotalBalance } from '@/app/(dashboard)/overview/total-balance'
import { Header } from '@/components/ui/header'
import { UpcomingBill } from '@/components/upcoming-bill'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default function Dashboard() {
  if (!cookies().has('token')) {
    redirect('/')
  }

  return (
    <div className="flex w-screen flex-col">
      <Header hasName />
      <main className="relative flex flex-col gap-8  pb-8 pl-6 pr-8 pt-4">
        <div className="flex items-center justify-between gap-6">
          {/* Top Content */}
          <TotalBalance />
          <MonthlyGoal />
          <UpcomingBill />
        </div>

        <div className="flex justify-between gap-6">
          {/* Bottom Content */}
          <RecentTransaction />

          <div className="flex flex-1 flex-col gap-8">
            <Statistics />
            <ExpenseBreakdown />
          </div>
        </div>
      </main>
    </div>
  )
}
