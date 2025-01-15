import { create } from 'zustand'

type UseOpenTransactionState = {
	id?: string
	isOpen: boolean
	onOpen: (id: string) => void
	onClose: () => void
}

export const useOpenTransaction = create<UseOpenTransactionState>(set => ({
	id: undefined,
	isOpen: false,
	onOpen: (id: string) => set({ isOpen: true, id }),
	onClose: () => set({ isOpen: false, id: undefined }),
}))
