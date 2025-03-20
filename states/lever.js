import { create } from "zustand"

export const useLeverState = create(set => ({
	isLeverAnimDone: false,
	setIsLeverAnimDone: v => set({
		isLeverAnimDone: v
	})
}))
