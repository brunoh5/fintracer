'use client'

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@components/ui/card'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { updateProfile } from '@/api/update-profile'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const passwordForm = z.object({
	oldPassword: z.string(),
	newPassword: z.string(),
	confirmPassword: z.string(),
})

type PasswordForm = z.infer<typeof passwordForm>

export function PasswordForm() {
	const queryClient = useQueryClient()

	const { register, handleSubmit } = useForm<PasswordForm>({
		resolver: zodResolver(passwordForm),
	})

	const { mutateAsync: updatePasswordFn } = useMutation({
		mutationFn: updateProfile,
		onMutate: async () => {
			await queryClient.cancelQueries({
				queryKey: ['profile'],
			})
		},
	})

	async function handleChangePassword(data: PasswordForm) {
		await updatePasswordFn({ data })
	}

	return (
		<Card className="rounded-none bg-transparent">
			<CardHeader>
				<CardTitle>Senha</CardTitle>
				<CardDescription>
					Troque sua senha. no momento não é possível recuperar a conta caso
					perda da senha
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form
					id="change-password"
					className="w-72 space-y-4"
					autoComplete="off"
					onSubmit={handleSubmit(handleChangePassword)}
				>
					<div className="space-y-2">
						<Label htmlFor="oldPassword">Senha atual</Label>
						<Input
							type="password"
							autoComplete="current-password"
							id="oldPassword"
							{...register('oldPassword')}
							placeholder="*********"
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="newPassword">Nova senha</Label>
						<Input
							type="password"
							id="newPassword"
							{...register('newPassword')}
							placeholder="*********"
							autoComplete="new-password"
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="confirmPassword">Confirme a senha</Label>
						<Input
							type="password"
							id="confirmPassword"
							{...register('confirmPassword')}
							placeholder="*********"
							autoComplete="new-password"
						/>
					</div>
				</form>
			</CardContent>
			<CardFooter className="flex justify-between">
				<div />
				<Button form="change-password">Salvar</Button>
			</CardFooter>
		</Card>
	)
}
