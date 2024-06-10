import { create } from 'zustand'

type NewTransactionState = {
	accountId?: string
	isOpen: boolean
	onOpen: (accountId?: string) => void
	onClose: () => void
}

export const useNewTransaction = create<NewTransactionState>((set) => ({
	isOpen: false,
	accountId: undefined,
	onOpen: (accountId?: string) => set({ isOpen: true, accountId }),
	onClose: () => set({ isOpen: false, accountId: undefined }),
}))
