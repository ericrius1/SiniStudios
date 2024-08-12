import { useFrame } from "@react-three/fiber"
import { useRef, useMemo } from "react"
import * as THREE from "three"

const Shape = ({ position, rotation, scale }) => (
  <mesh position={position} rotation={rotation} scale={scale}>
    <dodecahedronGeometry args={[0.05, 0]} />
    <meshBasicMaterial color="white" />
  </mesh>
)

export const Background = () => {
  const meshRef = useRef<THREE.Mesh>(null)
  const shapesRef = useRef<THREE.Group>(null)

  const shapes = useMemo(() => {
    return Array.from({ length: 2 }, () => ({
      position: [Math.random(), Math.random() + 1, 0],
      rotation: [
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI,
      ],
      scale: Math.random() * 0.5 + 0.5,
      speed: Math.random() * 0.002 + 0.001,
    }))
  }, [])

  useFrame(() => {
    shapes.forEach((shape, i) => {
      if (shapesRef.current) {
        const mesh = shapesRef.current.children[i] as THREE.Mesh
        mesh.position.y -= shape.speed
        mesh.rotation.x += 0.01
        mesh.rotation.y += 0.01

        if (mesh.position.y < -1) {
          mesh.position.y = 1
          mesh.position.x = Math.random() * 2 - 1
        }
      }
    })
  })

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <planeGeometry args={[2, 2]} />
      <meshBasicMaterial
        side={THREE.DoubleSide}
        color="white"
        opacity={0.1}
        visible={false}
        transparent
      />
      <group ref={shapesRef}>
        {shapes.map((shape, index) => (
          <Shape key={index} {...shape} />
        ))}
      </group>
    </mesh>
  )
}
