import {
  ArrowRightLeft,
  CreditCard,
  Crosshair,
  LayoutGrid,
  Receipt,
  Settings,
  Wallet,
} from 'lucide-react'

import { Navigation } from './Navigation'
import { SidebarProfile } from './sidebar-profile'
import { LogoutButton } from './logout-button'

export function Sidebar() {
  return (
    <aside
      className="flex min-h-screen w-full max-w-[280px] flex-col justify-between bg-eerie-black-900 px-7 py-12 font-semibold"
      suppressHydrationWarning
    >
      <div>
        <h1 className="mb-6 w-full text-center text-xl text-zinc-50 uppercase">
          Fine
          <span className="lowercase font-normal">bank.</span>
          IO
        </h1>

        <nav className="flex flex-col gap-4">
          <Navigation.Root href="/dashboard" shouldMatchExactHref={true}>
            <Navigation.Icon icon={LayoutGrid} />
            Dashboard
          </Navigation.Root>
          <Navigation.Root href="/balances" shouldMatchExactHref={true}>
            <Navigation.Icon icon={Wallet} />
            Balances
          </Navigation.Root>
          <Navigation.Root href="/transactions" shouldMatchExactHref={true}>
            <Navigation.Icon icon={ArrowRightLeft} />
            Transactions
          </Navigation.Root>
          <Navigation.Root href="/bills" shouldMatchExactHref={true}>
            <Navigation.Icon icon={Receipt} />
            Bills
          </Navigation.Root>
          <Navigation.Root href="/expenses" shouldMatchExactHref={true}>
            <Navigation.Icon icon={CreditCard} />
            Expenses
          </Navigation.Root>
          <Navigation.Root href="/goals" shouldMatchExactHref={true}>
            <Navigation.Icon icon={Crosshair} />
            Goals
          </Navigation.Root>
          <Navigation.Root href="/settings/account">
            <Navigation.Icon icon={Settings} />
            Settings
          </Navigation.Root>
        </nav>

        <LogoutButton />
      </div>

      <div className="mt-4 flex flex-col gap-11 divide-y">
        <SidebarProfile />
      </div>
    </aside>
  )
}
