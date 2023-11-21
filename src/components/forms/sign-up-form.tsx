'use client'

import Cookie from 'js-cookie'
import { useRouter } from 'next/navigation'
import { FormEvent } from 'react'

import { api } from '@/lib/api'
import { Input } from '../ui/Input'
import { Button } from '../ui/button'
import { useToast } from '../ui/use-toast'

export function SignUpForm() {
  const { toast } = useToast()
  const router = useRouter()

  async function handleRegister(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    try {
      const formData = new FormData(event.currentTarget)

      const response = await api.post('/users/create', {
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
      })

      Cookie.set('token', response.data.token)
      Cookie.set('user', response.data.user)

      router.push('/dashboard')
    } catch (err) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong',
        description: `${err}`,
      })
    }
  }

  return (
    <form onSubmit={handleRegister} className="flex flex-col gap-6">
      <Input.Root>
        <Input.Label text="Name" name="name" />
        <Input.Wrapper>
          <Input.Content
            name="name"
            placeholder="Bruno Henrique"
            autoComplete="name"
          />
        </Input.Wrapper>
      </Input.Root>
      <Input.Root>
        <Input.Label text="Email Address" name="email" />
        <Input.Wrapper>
          <Input.Content
            type="email"
            name="email"
            placeholder="hello@example.com"
            autoComplete="email"
          />
        </Input.Wrapper>
      </Input.Root>
      <Input.Root>
        <Input.Label name="password" text="Password" />
        <Input.Wrapper>
          <Input.Content
            type="password"
            name="password"
            placeholder="*********"
            autoComplete="new-password"
          />
        </Input.Wrapper>
      </Input.Root>

      <div className="mt-4 w-full">
        <p className="mx-auto">
          By continuing, you agree to our{' '}
          <span className="text-persian-green">terms of service.</span>
        </p>
      </div>

      <Button aria-label="sign up submit" type="submit">
        Sign up
      </Button>
    </form>
  )
}
