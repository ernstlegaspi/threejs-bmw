import { create } from "zustand"

export const useFloorState = create(set => ({
	isFloorAnimating: false,
	setIsFloorAnimating: v => set({
		isFloorAnimating: v
	})
}))
