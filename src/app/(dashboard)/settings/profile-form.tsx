'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getSession } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { getProfile } from '@/app/api/get-profile'
import { updateProfile } from '@/app/api/update-profile'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { TabsContent } from '@/components/ui/tabs'

const profileForm = z.object({
	name: z.string(),
	email: z.string().email(),
	phone: z.string().nullable().default(''),
})

type ProfileForm = z.infer<typeof profileForm>

export function ProfileForm() {
	const queryClient = useQueryClient()

	const { data: profile } = useQuery({
		queryKey: ['profile'],
		queryFn: getProfile,
		staleTime: 1000 * 60 * 10, // 10 minutes
	})

	const { register, handleSubmit } = useForm<ProfileForm>({
		resolver: zodResolver(profileForm),
	})

	const { mutateAsync: updateProfileFn } = useMutation({
		mutationKey: ['profile', 'update'],
		mutationFn: updateProfile,
		onMutate: async () => {
			await queryClient.cancelQueries({
				queryKey: ['profile'],
			})
		},
	})

	async function handleEditProfile(data: ProfileForm) {
		const session = await getSession()

		await updateProfileFn({ session, data })
	}

	return (
		<TabsContent value="profile">
			<form
				className="w-72 space-y-4"
				onSubmit={handleSubmit(handleEditProfile)}
			>
				<div className="space-y-2">
					<Label htmlFor="fullName">Nome completo</Label>
					<Input
						id="fullName"
						{...register('name')}
						defaultValue={profile?.name}
					/>
				</div>
				<div className="space-y-2">
					<Label htmlFor="fullName">Email</Label>
					<Input
						id="email"
						type="email"
						{...register('email')}
						defaultValue={profile?.email}
					/>
				</div>
				<div className="space-y-2">
					<Label htmlFor="phone">Telefone</Label>
					<Input
						id="phone"
						{...register('phone')}
						defaultValue={profile?.phone ?? ''}
					/>
				</div>

				<Button type="submit" className="text-xs font-bold text-zinc-50">
					Atualizar perfil
				</Button>
			</form>
		</TabsContent>
	)
}
