import { Center, Html, useTexture } from "@react-three/drei"

export const Item2 = () => {
  const texture = useTexture("/textures/moon.png")
  return (
    <Center>
      <Html>
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            // backgroundColor: "red",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              whiteSpace: "nowrap",
              // textAlign: "center",
            }}
          >
            <h1 style={{ marginBottom: "1em" }}>Moonlit whispers</h1>
            <p>Cherry blossoms dance in mist</p>
            <p>Bamboo shadows sway</p>
            <p>Eternity in dewdrops</p>
          </div>
        </div>
      </Html>
      <mesh position={[0, 0, -10]}>
        <planeGeometry args={[16, 16]} />
        <meshBasicMaterial map={texture} transparent opacity={1} />
      </mesh>
    </Center>
  )
}
