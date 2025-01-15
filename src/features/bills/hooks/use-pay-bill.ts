import { create } from 'zustand'

type PayBillState = {
	id?: string
	isOpen: boolean
	onOpen: (id: string) => void
	onClose: () => void
}

export const usePayBill = create<PayBillState>(set => ({
	id: undefined,
	isOpen: false,
	onOpen: (id: string) => set({ isOpen: true, id }),
	onClose: () => set({ isOpen: false, id: undefined }),
}))
