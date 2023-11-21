import { ReactNode } from 'react'

export function InputWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="relative mt-2 rounded-md shadow-sm w-full">{children}</div>
  )
}
