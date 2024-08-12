import { Center, Instance, Instances } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useRef, useMemo } from "react"
import * as THREE from "three"
import { CustomeMaterial } from "./material"

export const Item13 = () => {
  const groupRef = useRef<THREE.Group>(null)
  const instancesRef = useRef<THREE.InstancedMesh>(null)

  const count = 20
  const radius = 2

  const dummy = useMemo(() => new THREE.Object3D(), [])

  useFrame(({ clock }) => {
    if (!instancesRef.current) return

    const time = clock.getElapsedTime()

    for (let i = 0; i < count; i++) {
      const t = (i / count) * Math.PI * 2
      const x = Math.cos(t + time) * radius
      const y = Math.sin(t + time) * radius
      const z = Math.sin(time * 2 + i * 0.1) * 0.5

      dummy.position.set(x, y, z)
      dummy.rotation.set(time * 0.5, time * 0.3, time * 0.2)

      // Calculate scale based on time and position
      const scale = 1 + Math.sin(time * 2 + t) * 0.3
      dummy.scale.set(scale, scale, scale)

      dummy.updateMatrix()

      instancesRef.current.setMatrixAt(i, dummy.matrix)
    }

    instancesRef.current.instanceMatrix.needsUpdate = true

    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.1
    }
  })

  return (
    <Center>
      <group ref={groupRef} scale={0.6}>
        <Instances limit={count} ref={instancesRef}>
          <sphereGeometry args={[0.2, 32, 32]} />
          <CustomeMaterial />
          {Array.from({ length: count }).map((_, i) => (
            <Instance key={i} />
          ))}
        </Instances>
      </group>
    </Center>
  )
}
