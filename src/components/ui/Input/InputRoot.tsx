import { ReactNode } from 'react'

export function InputRoot({ children }: { children: ReactNode }) {
  return <div className="w-full">{children}</div>
}
