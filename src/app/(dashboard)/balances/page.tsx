import { NewAccountForm } from '@/components/forms/new-account-form'
import { Header } from '@/components/ui/header'
import { Suspense } from 'react'
import { AccountList } from './accounts-list'

export default function Balances() {
  return (
    <div className="flex w-screen flex-col">
      <Header />

      <main className="relative flex flex-col gap-4 pb-8 pl-6 pr-8 pt-4">
        <h2 className="text-[22px] text-gray-500">Contas</h2>

        <div className="grid h-screen w-full grid-cols-3 grid-rows-[288px] gap-x-6 gap-y-8 overflow-auto">
          {/* <AccountList /> */}
          <Suspense fallback={<p>Carregando</p>}>
            <AccountList />
          </Suspense>

          <NewAccountForm />
        </div>
      </main>
    </div>
  )
}
