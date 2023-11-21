import dayJs from 'dayjs'
import { ChevronsRight, Bell, Search } from 'lucide-react'
import Cookie from 'js-cookie'

import { Input } from './Input'

interface HeaderProps {
  hasName?: boolean
}

// type User = {
//   name: string
//   avatar_url?: string | null
// }

export function Header({ hasName = false }: HeaderProps) {
  const user = Cookie.get('user')

  return (
    <header className="flex h-[88px] items-center justify-between pb-5 pl-6 pr-8 pt-5">
      <div className="flex items-center justify-center gap-6">
        {hasName && (
          <span className="text-xl text-eerie-black-900">
            Bem vindo {user ? JSON.parse(user).name : 'Visitante'}!
          </span>
        )}
        <div className="flex items-center justify-center text-gray-300 gap-2">
          <ChevronsRight />
          <span>{dayJs().format('DD MMM, YYYY')}</span>
        </div>
      </div>
      <div className="flex h-[416px] items-center justify-between gap-8">
        <Bell />
        <Input.Wrapper>
          <Input.Content
            name="search"
            placeholder="Search here"
            theme="light"
            autoComplete="off"
          />
          <Input.Icon icon={Search} position="right" />
        </Input.Wrapper>
      </div>
    </header>
  )
}
