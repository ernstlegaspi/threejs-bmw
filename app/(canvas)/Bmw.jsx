import { useFrame, useLoader } from "@react-three/fiber"
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { Mesh } from "three"

export default function BMW() {
	const gltf = useLoader(GLTFLoader, "/models/bmw/scene.gltf")
	const carSize = 450

	useFrame(() => {
		gltf.scene.scale.set(carSize, carSize, carSize)
		gltf.scene.position.set(9.5, 0, 8.9)

		gltf.scene.traverse(model => {
			if(model instanceof Mesh) {
				model.castShadow = true
			}
		})
	})

	return <primitive object={gltf.scene} />
}