'use client'
import { ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import Link, { LinkProps } from 'next/link'
import { twMerge } from 'tailwind-merge'

interface NavigationTabRootProps extends LinkProps {
  children: ReactNode
  className?: string
  shouldMatchExactHref?: boolean
}

export function NavigationTabRoot({
  children,
  className,
  ...rest
}: NavigationTabRootProps) {
  const pathname = usePathname()

  let isActive = false

  if (
    pathname.startsWith(String(rest.href)) ||
    pathname.startsWith(String(rest.as))
  ) {
    isActive = true
  }

  return (
    <Link
      className={twMerge(
        `flex items-center text-gray-300 ${
          isActive && 'border-b-2 border-persian-green text-persian-green'
        } px-2 py-4 `,
        className,
      )}
      {...rest}
    >
      {children}
    </Link>
  )
}
