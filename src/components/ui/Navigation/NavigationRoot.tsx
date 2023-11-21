'use client'
import { ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import Link, { LinkProps } from 'next/link'

interface NavigationRootProps extends LinkProps {
  className?: string
  children: ReactNode
  shouldMatchExactHref?: boolean
}

export function NavigationRoot({
  children,
  className,
  shouldMatchExactHref = false,
  ...rest
}: NavigationRootProps) {
  const pathname = usePathname()

  const [, firstPathname] = String(rest.href).split('/')

  let isActive = false

  if (
    shouldMatchExactHref &&
    (pathname.startsWith(String(rest.href)) || pathname === rest.as)
  ) {
    isActive = true
  }

  if (
    !shouldMatchExactHref &&
    (pathname.startsWith(`/${firstPathname}`) ||
      pathname.startsWith(String(rest.as)))
  ) {
    isActive = true
  }

  return (
    <Link
      className={`flex items-center gap-3 rounded ${
        isActive && 'bg-persian-green'
      } px-4 py-3 text-gray-100 hover:bg-white/[0.08] transition-colors`}
      {...rest}
    >
      {children}
    </Link>
  )
}
