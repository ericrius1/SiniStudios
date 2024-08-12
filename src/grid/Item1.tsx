import { Center, useTexture } from "@react-three/drei"
import { useFrame, useThree } from "@react-three/fiber"
import { useEffect, useRef, useMemo } from "react"
import * as THREE from "three"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { useStore } from "../store/useStore"

export const Item1 = ({ active }: { active: boolean }) => {
  const cameraStream = useStore((state) => state.cameraStream)
  const texture = useTexture("/textures/qi.jpg")
  const texture_n = useTexture("/textures/qi-n.jpg")
  const lightRef = useRef<THREE.SpotLight>(null)
  const viewport = useThree((state) => state.viewport)
  const camera = useThree((state) => state.camera)
  const vec = new THREE.Vector3()

  const videoTexture = useMemo(() => {
    const video = document.createElement("video")
    video.playsInline = true
    video.autoplay = true
    video.muted = true
    return new THREE.VideoTexture(video)
  }, [])

  useEffect(() => {
    if (cameraStream && videoTexture.image instanceof HTMLVideoElement) {
      videoTexture.image.srcObject = cameraStream
      videoTexture.image.play()
    }
  }, [cameraStream, videoTexture])

  useFrame((state) => {
    const pointer = state.pointer
    const x = (pointer.x * viewport.width) / 2
    const y = (pointer.y * viewport.height) / 2
    vec.set(x, y, 5)
    lightRef.current?.position.copy(vec)
  })

  useGSAP(() => {
    const zDelta = active ? 5 : -5

    gsap.to(camera.position, {
      x: 0,
      y: 0,
      z: `+=${zDelta}`,
      duration: 0.3,
      ease: "power1.inOut",
    })
  }, [active])

  return (
    <Center>
      <ambientLight intensity={1} />
      <pointLight
        ref={lightRef}
        intensity={100}
        distance={10}
        position={[0, 0, 5]}
      />
      <mesh>
        <planeGeometry args={[16, 16]} />
        <meshStandardMaterial
          map={cameraStream ? videoTexture : texture}
          normalMap={texture_n}
        />
      </mesh>
    </Center>
  )
}
