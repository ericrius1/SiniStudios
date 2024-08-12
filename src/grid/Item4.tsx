import { Center, useTexture } from "@react-three/drei"
import { useThree, useFrame } from "@react-three/fiber"
import { useRef } from "react"
import * as THREE from "three"

export const Item4 = () => {
  const texture = useTexture("/textures/glistening.png")
  const lightRef = useRef<THREE.SpotLight>(null)
  const viewport = useThree((state) => state.viewport)
  const vec = new THREE.Vector3()

  useFrame((state) => {
    const pointer = state.pointer
    const x = (pointer.x * viewport.width) / 2
    const y = (pointer.y * viewport.height) / 2
    vec.set(x, y, 5)
    lightRef.current?.position.copy(vec)
  })
  return (
    <Center>
      <ambientLight intensity={1} />
      <pointLight
        ref={lightRef}
        intensity={100}
        distance={10}
        position={[0, 0, 5]}
      ></pointLight>
      <mesh>
        <planeGeometry args={[16, 16]} />

        <meshPhysicalMaterial clearcoatRoughness={0.5} map={texture} />
      </mesh>
    </Center>
  )
}
