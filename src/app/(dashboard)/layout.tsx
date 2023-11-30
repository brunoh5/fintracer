import { Sidebar } from '@/components/sidebar'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  if (!cookies().has('token')) {
    redirect('/')
  }

  return (
    <div className="flex">
      <Sidebar />

      {children}
    </div>
  )
}
