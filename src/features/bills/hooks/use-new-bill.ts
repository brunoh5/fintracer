import { create } from 'zustand'

type NewBillState = {
	isOpen: boolean
	onOpen: () => void
	onClose: () => void
}

export const useNewBill = create<NewBillState>((set) => ({
	isOpen: false,
	onOpen: () => set({ isOpen: true }),
	onClose: () => set({ isOpen: false }),
}))
