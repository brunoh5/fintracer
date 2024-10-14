'use client'

import { Button } from '@components/ui/button'

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@components/ui/dropdown-menu'
import { Plus } from 'lucide-react'
import { useNewTransaction } from '../hooks/use-new-transaction'

export function TransactionsActions() {
	const { onOpen } = useNewTransaction()

	return (
		<DropdownMenu>
			<DropdownMenuTrigger className="border border-input p-2">
				<Plus className="size-4" />
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuItem>
					<Button type="button" onClick={() => onOpen()}>
						Nova transação
					</Button>
				</DropdownMenuItem>
				<DropdownMenuItem>
					<Button disabled type="button" onClick={() => {}}>
						Transferência entre contas
					</Button>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
