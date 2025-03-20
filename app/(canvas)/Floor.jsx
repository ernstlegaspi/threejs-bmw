import { Clone } from "@react-three/drei"
import { useLoader } from "@react-three/fiber"
import { useEffect, useState } from "react"
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

export default function Floor() {
	const gltf = useLoader(GLTFLoader, "/models/floor/scene.gltf")
	const initialPos = { x: 0, z: 0 }
	const tempPos = [initialPos]
	const [pos, setPos] = useState([initialPos])

	let offsetX = 9
	let offsetZ = 0

	useEffect(() => {
		if(tempPos.length === 9) return

		for(let i=2; i<=9; i++) {
			tempPos.push({
				x: offsetX,
				z: offsetZ
			})

			offsetX += 9

			if(i % 3 === 0) {
				offsetX = 0
				offsetZ += 9
			}
		}

		setPos(tempPos)
	}, [])

	return <>
		{pos.map(floor => <Clone
			scale={[.05, .05, .05]}
			object={gltf.scene}
			receiveShadow
			castShadow
			position={[floor.x, 0, floor.z]}
		/>)}
	</>
}
