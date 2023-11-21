import Link from 'next/link'
import Image from 'next/image'

import googleIcon from '@/assets/google.svg'
import { SignUpForm } from '@/components/forms/sign-up-form'

export default function SignUp() {
  return (
    <main className="flex h-screen flex-1 items-center justify-center">
      <div className="flex w-full max-w-md flex-col">
        <h1 className="mb-6 w-full text-center text-2xl text-persian-green">
          <span className="font-semibold uppercase">Fine</span>
          bank.
          <span className="font-semibold uppercase">IO</span>
        </h1>

        <h2 className="text-center text-xl font-bold">Create an account</h2>

        <SignUpForm />

        <div className="my-4 flex items-center justify-center gap-4 before:flex-1 before:border-b before:border-gray-300 before:content-[''] after:flex-1 after:border-b after:border-gray-300 after:content-['']">
          or sign up with
        </div>

        <button
          className="my-4 flex w-full items-center justify-center gap-1 rounded bg-gray-200 px-3 py-2 text-center"
          aria-label="Login com google"
        >
          <Image src={googleIcon} alt="google" width={24} height={24} />
          Continue with Google
        </button>

        <div className="text-center">
          Already have an account?{' '}
          <Link href="/" className="text-persian-green">
            Sign in here
          </Link>
        </div>
      </div>
    </main>
  )
}
