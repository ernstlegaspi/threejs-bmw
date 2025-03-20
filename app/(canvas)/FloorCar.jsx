import { useLeverState } from "@/states/lever"
import { useFloorState } from "@/states/floor"
import { useEffect, useRef, useState } from "react"

import gsap from "gsap"
import BMW from "./Bmw"
import Floor from "./Floor"

export default function FloorCar() {
	const [isFloating, setIsFloating] = useState(false)
	const { isLeverAnimDone, setIsLeverAnimDone } = useLeverState()
	const { setIsFloorAnimating } = useFloorState()
	const ref = useRef()

	useEffect(() => {
		if(!ref.current || !isLeverAnimDone) return

		setIsFloating(prev => !prev)
		setIsFloorAnimating(true)

		gsap.to(ref.current.position, {
			y: isFloating ? 0 : 10,
			duration: 1,
			onComplete: () => {
				setIsLeverAnimDone(false)
				setIsFloorAnimating(false)
			}
		})
	}, [isLeverAnimDone])

	return <group ref={ref}>
		<BMW />
		<Floor />
	</group>
}