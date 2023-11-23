'use client'

import Cookie from 'js-cookie'
import { Check } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FormEvent } from 'react'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { api, AxiosError, isAxiosError } from '@/lib/api'
import { Button } from '../ui/button'
import { Input } from '../ui/Input'
import { useToast } from '../ui/use-toast'

export function LoginForm() {
  const { toast } = useToast()
  const router = useRouter()

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    try {
      const response = await api.post('/sessions', {
        email: formData.get('email'),
        password: formData.get('password'),
        remember: formData.get('remember'),
      })

      Cookie.set('token', response.data.token)
      Cookie.set('user', JSON.stringify(response.data.user))

      router.push('/dashboard')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any | AxiosError) {
      if (!isAxiosError(error)) {
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong',
          description: `${error}`,
        })
      }
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong',
        description: `${error.response.data.message}`,
      })
    }
  }

  return (
    <form onSubmit={handleLogin} className="flex flex-col gap-6">
      <Input.Root>
        <Input.Label name="email" text="Email Address" />
        <Input.Wrapper>
          <Input.Content
            name="email"
            placeholder="johndoe@email.com"
            type="email"
            autoComplete="email"
            required
          />
        </Input.Wrapper>
      </Input.Root>

      <Input.Root>
        <div className="flex justify-between">
          <Input.Label name="password" text="Password" />
          <Link href="/forgotPassword" className="text-xs text-persian-green">
            Forgot Password
          </Link>
        </div>
        <Input.Wrapper>
          <Input.Content
            name="password"
            placeholder="*********"
            type="password"
            autoComplete="current-password"
            required
          />
        </Input.Wrapper>
      </Input.Root>

      <label htmlFor="test" className="relative mt-4 block cursor-pointer pl-8">
        <input
          type="checkbox"
          id="test"
          className="peer absolute h-0 w-0 opacity-0"
        />
        <span className="group absolute left-0 top-0 h-[20px] w-[20px] rounded border border-eerie-black-700 bg-[#D0D5DD] peer-checked:bg-persian-green"></span>
        <Check
          className="absolute left-[2px] top-[3px] text-white peer-checked:block peer-[&:not(:checked)]:hidden"
          size={16}
        />
        Keep me signed in
      </label>

      <Button aria-label="login submit" type="submit">
        Login
      </Button>
    </form>
  )
}
