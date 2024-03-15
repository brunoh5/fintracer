'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { updateProfile } from '@/app/api/update-profile'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { TabsContent } from '@/components/ui/tabs'

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
		mutationKey: ['profile', 'update'],
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
		<TabsContent value="security">
			<form
				className="w-72 space-y-4"
				onSubmit={handleSubmit(handleChangePassword)}
				autoComplete="off"
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

				<span className="mt-4 text-xs">
					*Caso perca a senha não é possível recuperar, por enquanto
				</span>

				<Button className="text-xs font-bold text-zinc-50">
					Atualizar senha
				</Button>
			</form>
		</TabsContent>
	)
}
