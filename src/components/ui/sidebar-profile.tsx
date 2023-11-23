'use client'

import { api } from '@/lib/api'
import Cookie from 'js-cookie'
import { MoreVertical, UserCircleIcon } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'

type User = {
  name: string
  avatar_url: null
}

export function SidebarProfile() {
  const token = Cookie.get('token')
  const [user, setUser] = useState<User>()

  useEffect(() => {
    api
      .get('/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUser(res.data.user)
      })
  }, [token])

  return (
    <div className="flex items-center py-8">
      {user?.avatar_url ? (
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
