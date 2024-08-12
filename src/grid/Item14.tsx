import { Center, Instance, Instances } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useRef, useMemo } from "react"
import * as THREE from "three"
import { CustomeMaterial } from "./material"

export const Item14 = () => {
  const groupRef = useRef<THREE.Group>(null)
  const instancesRef = useRef<THREE.InstancedMesh>(null)

  const count = 8
  const size = 1.5

  const dummy = useMemo(() => new THREE.Object3D(), [])

  useFrame(({ clock }) => {
    if (!instancesRef.current) return

    const time = clock.getElapsedTime()

    for (let i = 0; i < count; i++) {
      for (let j = 0; j < count; j++) {
        const index = i * count + j
        const x = ((i - count / 2 + 0.5) * size) / 2
        const y = ((j - count / 2 + 0.5) * size) / 2
        const z =
          (Math.sin((i / count + time * 0.2) * Math.PI * 2) *
            Math.cos((j / count + time * 0.2) * Math.PI * 2) *
            size) /
          4

        dummy.position.set(x, y, z)

        // Slow moving meditative wave pulse
        const pulseScale =
          0.3 + Math.sin((i / count + j / count + time * 0.1) * Math.PI) * 0.2
        dummy.scale.setScalar(pulseScale)

        dummy.rotation.set(time * 0.2 + i, time * 0.1 + j, time * 0.05)
        dummy.updateMatrix()

        instancesRef.current.setMatrixAt(index, dummy.matrix)
      }
    }

    instancesRef.current.instanceMatrix.needsUpdate = true

    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.05
      groupRef.current.rotation.x = Math.sin(time * 0.1) * 0.1
    }
  })

  return (
    <Center>
      <group ref={groupRef} scale={0.4}>
        <Instances limit={count * count} ref={instancesRef}>
          <boxGeometry args={[1, 1, 1]} />
          <CustomeMaterial />
          {Array.from({ length: count * count }).map((_, i) => (
            <Instance key={i} />
          ))}
        </Instances>
      </group>
    </Center>
  )
}
