import { useFrame, useLoader } from "@react-three/fiber"
import { useEffect, useRef, useState } from "react"
import { GLTFLoader } from "three/addons/loaders/GLTFLoader"
import { Mesh } from "three"

export default function Debries() {
	const gltf = useLoader(GLTFLoader, "/models/rocks/scene.gltf")
	const [rocks, setRocks] = useState([])
	const arr = useRef(new Array(100).fill(0))

	useEffect(() => {
		const temp = []

		gltf.scene.traverse(models => {
			if(models instanceof Mesh) {
				temp.push(models)

				setRocks(temp)
			}
		})
	}, [gltf])

	const Rock = index => {
		if(!rocks) return

		const rand = Math.floor(Math.random() * 5)
		const rock = rocks[rand]
		const randPosX = -4.2 + Math.random() * (22.2 - -4.2)
		const randPosZ = -3 + Math.random() * (22.2 - -3)
		const rockRef = useRef()
		const fallSpeed = Math.random() + 1
		const rotateSpeed = Math.random()
		const axisRotation = Math.floor(Math.random() * 7) + 1
		const rotationAxes = ["x", "y", "z"]
		const isNegative = [Math.random() < 0.5, Math.random() < 0.5, Math.random() < 0.5]
		let willShrink = false

		useFrame((_, delta) => {
			if(!rockRef.current) return

			if(rockRef.current.position.y <= -5) {
				willShrink = true
			}

			if(willShrink) {
				rockRef.current.scale.x -= .0001
				rockRef.current.scale.y -= .0001
				rockRef.current.scale.z -= .0001

				if(rockRef.current.scale.x <= 0) {
					rockRef.current.position.y = -1
					rockRef.current.scale.set(.02, .02, .02)
					willShrink = false
				}
			}

			rockRef.current.position.y -= delta * fallSpeed

			const applyRotation = (axis, index) => {
				const direction = isNegative[index] ? -1 : 1
				rockRef.current.rotation[axis] += direction * delta * rotateSpeed
			}

			rotationAxes.forEach((axis, index) => {
				if(axisRotation & (1 << index)) {
					applyRotation(axis, index)
				}
			})
		})

		return <mesh ref={rockRef} position={[randPosX, -1, randPosZ]} scale={[.02, .02, .02]} geometry={rock.geometry} material={rock.material} />
	}

	return <>
		{ rocks && rocks.length > 0 ? arr.current.map((v, i) => <Rock key={i} index={i} />) : null }
	</>
}
