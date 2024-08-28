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
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { getProfile } from '@/api/get-profile'
import { updateProfile } from '@/api/update-profile'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const profileForm = z.object({
	name: z.string(),
})

type ProfileForm = z.infer<typeof profileForm>

export function ProfileForm() {
	const queryClient = useQueryClient()

	const { data: profile } = useQuery({
		queryKey: ['profile'],
		queryFn: getProfile,
		staleTime: 1000 * 60 * 60 * 7, // a week
	})

	const { register, handleSubmit } = useForm<ProfileForm>({
		resolver: zodResolver(profileForm),
		defaultValues: {
			name: profile?.name ?? '',
		},
	})

	const { mutateAsync: updateProfileFn } = useMutation({
		mutationFn: updateProfile,
		onMutate: async () => {
			await queryClient.cancelQueries({
				queryKey: ['profile'],
			})
		},
	})

	async function handleEditProfile(data: ProfileForm) {
		await updateProfileFn({ data })
	}

	return (
		<Card className="rounded-none bg-transparent">
			<CardHeader>
				<CardTitle>Nome exibido</CardTitle>
				<CardDescription>
					Por favor digite seu nome completo, ou um nome no qual esteja
					confortável
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form
					id="change-name"
					className="w-72 space-y-4"
					onSubmit={handleSubmit(handleEditProfile)}
				>
					<Input id="fullName" {...register('name')} />
				</form>
			</CardContent>
			<CardFooter className="flex justify-between">
				<div />
				<Button form="change-name">Salvar</Button>
			</CardFooter>
		</Card>
	)
}
