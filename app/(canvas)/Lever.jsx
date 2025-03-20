import { useLoader } from "@react-three/fiber"
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { useLeverState } from "@/states/lever"
import { useEffect, useState } from "react"
import { useFloorState } from "@/states/floor"
import gsap from "gsap"

export default function Lever() {
	const gltf = useLoader(GLTFLoader, "/models/lever/lever.glb")
	const [isOpen, setIsOpen] = useState(false)
	const [isClicked, setIsClicked] = useState(false)
	const { setIsLeverAnimDone } = useLeverState()
	const { isFloorAnimating } = useFloorState()

	const leverClick = () => {
		if(isFloorAnimating || isClicked) return

		setIsClicked(true)
		setIsOpen(prev => !prev)

		gsap.to(gltf.scene.children[1].rotation, {
			x: isOpen ? 0 : -1.3,
			duration: 1,
			onComplete: () => {
				setIsLeverAnimDone(true)
				setIsClicked(false)
			}
		})
	}

	const hoverLever = () => {
		const cursor = document.body.style.cursor
		document.body.style.cursor = cursor === "default" || !cursor ? "pointer" : "default"
	}

	useEffect(() => {
		gltf.scene.position.set(-6, -.2, 21)
	}, [])

	return <primitive
		onClick={leverClick}
		onPointerEnter={hoverLever}
		onPointerLeave={hoverLever}
		object={gltf.scene}
	/>
}
