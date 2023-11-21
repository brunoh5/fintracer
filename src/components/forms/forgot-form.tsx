'use client'

import { useRouter } from 'next/navigation'
import { FormEvent } from 'react'
import { api } from '@/lib/api'
import { Input } from '../ui/Input'
import { Button } from '../ui/button'

export function ForgotForm() {
  const { push } = useRouter()

  async function handleForgotPassword(event: FormEvent<HTMLFormElement>) {
    const formData = new FormData(event.currentTarget)

    const data = {
      email: formData.get('email'),
    }

    try {
      const response = await api.post('/users/forgotPassword', data)

      console.log(response.data)

      push('/dashboard')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <form className="w-full max-w-[400px]" onSubmit={handleForgotPassword}>
      <Input.Root>
        <Input.Label text="Email Address" name="email" />
        <Input.Wrapper>
          <Input.Content
            name="email"
            placeholder="johndoe@email.com"
            type="email"
            autoComplete="email"
          />
        </Input.Wrapper>
      </Input.Root>

      <Button aria-label="forgot password submit">Password Reset</Button>
    </form>
  )
}
