'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { forgotPassword } from '@/app/api/forgot-password'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const forgotPasswordSchema = z.object({
	email: z.string().email(),
})

type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>

export default function ForgotPassword() {
	const {
		register,
		handleSubmit,
		formState: { isSubmitting },
	} = useForm<ForgotPasswordSchema>({
		resolver: zodResolver(forgotPasswordSchema),
	})

	const { mutateAsync: forgotPasswordFn } = useMutation({
		mutationFn: forgotPassword,
	})

	async function handleForgotPassword(data: ForgotPasswordSchema) {
		try {
			await forgotPasswordFn({
				email: data.email,
			})
		} catch {
			toast.error('Erro ao recriar a senha')
		}
	}

	return (
		<div>
			<Button asChild variant="ghost" className="absolute right-8 top-8">
				<Link href="/">Fazer login</Link>
			</Button>

			<div className="flex w-[350px] flex-col justify-center gap-6">
				<div className="flex flex-col gap-2 text-center">
					<h1 className="w-full font-semibold tracking-tight">
						Resgate sua conta
					</h1>
					<p className="text-sm text-muted-foreground">Crie uma nova senha</p>
				</div>

				<form
					onSubmit={handleSubmit(handleForgotPassword)}
					className="space-y-4"
				>
					<div>
						<Label htmlFor="email">E-mail</Label>
						<Input
							type="email"
							id="email"
							{...register('email')}
							autoComplete="email"
							required
						/>
					</div>

					<Button
						aria-label="forgot password submit"
						className="w-full"
						disabled={isSubmitting}
					>
						Relembrar senha
					</Button>
				</form>
			</div>
		</div>
	)
}
