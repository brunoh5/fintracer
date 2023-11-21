import { MoreVertical, UserCircleIcon } from 'lucide-react'
import Image from 'next/image'
import Cookie from 'js-cookie'

type User = {
  name: string
  avatar_url?: string | null
}

export function SidebarProfile() {
  const userCookies = Cookie.get('user')
  let user: User

  if (userCookies) {
    user = JSON.parse(userCookies)
  } else {
    user = {
      name: 'Desconhecido',
    }
  }

  return (
    <div className="flex items-center py-8">
      {user.avatar_url ? (
        <Image
          src={user.avatar_url ? user.avatar_url : ''}
          alt="Profile Picture"
          width={32}
          height={32}
          className="overflow-hidden rounded-full"
        />
      ) : (
        <UserCircleIcon />
      )}
      <div className="relative ml-4 flex-1">
        <div className="mr-8 flex w-full flex-col">
          <span className="overflow-hidden text-sm text-white">
            {user?.name}
          </span>
          <span className="text-xs text-white/20">View Profile</span>
        </div>
        <MoreVertical className="absolute right-0 top-1 text-white" />
      </div>
    </div>
  )
}
