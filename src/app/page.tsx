import Link from 'next/link'
import Image from 'next/image'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import googleIcon from '@/assets/google.svg'
import { LoginForm } from '@/components/forms/login-form'

export default function Home() {
  if (cookies().has('token')) {
    redirect('/dashboard')
  }

  return (
    <main className="flex h-screen flex-1 items-center justify-center">
      <div className="w-full max-w-md">
        <h1 className="mb-6 w-full text-center text-2xl text-persian-green">
          <span className="font-semibold uppercase">Fine</span>
          bank.
          <span className="font-semibold uppercase">IO</span>
        </h1>

        <LoginForm />

        <div className="my-4 flex items-center justify-center gap-4 before:flex-1 before:border-b before:border-gray-300 before:content-[''] after:flex-1 after:border-b after:border-gray-300 after:content-['']">
          <p>or sign in with</p>
        </div>

        <button
          className="my-4 flex w-full items-center justify-center gap-1 rounded bg-gray-200 px-3 py-2 text-center"
          aria-label="Login com google"
        >
          <Image
            src={googleIcon}
            alt="google"
            width={24}
            height={24}
            className="mr-4"
          />
          Continue with Google
        </button>

        <Link
          href="/signUp"
          className="block w-full text-center text-persian-green"
        >
          Create an account
        </Link>
      </div>
    </main>
  )
}
