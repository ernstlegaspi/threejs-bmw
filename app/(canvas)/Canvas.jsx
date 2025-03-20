"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { Environment, OrbitControls, PerspectiveCamera, useHelper } from "@react-three/drei"
import { useRef } from "react"
import Lever from "./Lever"
import FloorCar from "./FloorCar"
import { SpotLightHelper } from "three"
import Debries from "./Debries"

export default function CanvasPage() {
	const Lights = () => {
		const ref = useRef()
		// useHelper(ref, SpotLightHelper, 1, "red");
		
		useFrame(() => {
			ref.current.position.set(25, 25, 25)
		})
		
		return <>
			<spotLight
				distance={100}
				ref={ref}
				intensity={5000}
				castShadow
			/>
		</>
	}
	
	const MainCamera = () => {
		const ref = useRef()

		useFrame(() => {
			// console.log(ref.current)
		})

		return <PerspectiveCamera
			ref={ref}
			makeDefault
			fov={75}
			position={[8.453155906986481, 19.513541741090712, 33.163812846920735]}
			rotation={[-0.7448129348525361, 0.004375659482337093, 0.004034122852830249]}
		/>
	}

	return <>
		<Canvas shadows>
			<MainCamera />

			<FloorCar />
			<Debries />
			<Lever />

			<Lights />
			<Environment preset="sunset" />

			<OrbitControls
				makeDefault
				enableDamping
				dampingFactor={.03}
			/>
		</Canvas>
	</>
}
