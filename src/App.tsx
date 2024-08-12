import {
  OrbitControls,
  View,
  PerspectiveCamera,
  CameraControls,
  KeyboardControls,
} from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { ReactNode, Suspense, useEffect, useState } from "react"
import Card from "./components/card"

import { Perf } from "r3f-perf"

import { Background } from "./components/background"
import { Hero } from "./components/Hero"
import { Item1 } from "./grid/Item1"
import { Item2 } from "./grid/Item2"
import { Item3 } from "./grid/Item3"
import { Item4 } from "./grid/Item4"
import { Item5 } from "./grid/Item5"
import { Item6 } from "./grid/Item6"
import { Item7 } from "./grid/Item7"
import { Item8 } from "./grid/Item8"
import { Item9 } from "./grid/Item9"
import { Item10 } from "./grid/Item10"
import { Item11 } from "./grid/Item11"
import { Item12 } from "./grid/Item12"
import { Item13 } from "./grid/Item13"
import { Item14 } from "./grid/Item14"
import { EtherealSynth } from "./components/synth"
import { MidiController } from "./components/midi-controller"
import PermissionsButton from "./components/permissions-button"
import { div } from "three/examples/jsm/nodes/Nodes.js"

function App() {
  const items = [
    { component: Item1, name: "Qi Ball" },
    { component: Item2, name: "Loop" },
    // { component: Item3, name: "Coins" },
    { component: Item4, name: "A Glistening Structure Beneath All Things" },
    //   { component: Item5, name: "Rubik" },
    //   { component: Item6, name: "Travel" },
    //   { component: Item7, name: "Stagger" },
    //   { component: Item8, name: "Balance" },
    //   { component: Item9, name: "Pulse" },
    //   { component: Item10, name: "Pie" },
    //   { component: Item11, name: "Newton's Cradle" },
    //   { component: Item12, name: "Arrows" },
    //   { component: Item13, name: "Swirl" },
    //   { component: Item14, name: "Morphing Cube" },
  ]

  const keyMidiMap = {
    a: 60,
    w: 61,
    s: 62,
    e: 63,
    d: 64,
    f: 65,
    t: 66,
    g: 67,
    y: 68,
    h: 69,
    u: 70,
    j: 71,
    k: 72,
    o: 73,
    l: 74,
    p: 75,
  }

  const keyboardControlsMap = Object.entries(keyMidiMap).map(
    ([key, midiNote]) => ({
      name: `note${midiNote}`,
      keys: [key],
    })
  )

  useEffect(() => {
    const cards = document.querySelectorAll<HTMLDivElement>(".card")

    const handlePointerMove = (e: PointerEvent) => {
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        card.style.setProperty("--mouse-x", `${x}px`)
        card.style.setProperty("--mouse-y", `${y}px`)
      })
    }

    document
      .querySelector<HTMLDivElement>("[data-gird]")
      ?.addEventListener("pointermove", handlePointerMove)

    return () => {
      document
        .querySelector<HTMLDivElement>("[data-gird]")
        ?.removeEventListener("pointermove", handlePointerMove)
    }
  }, [])

  return (
    <KeyboardControls map={keyboardControlsMap}>
      <div className="min-h-screen text-white bg-[#0c0c0c] select-none background">
        <PermissionsButton />
        <View className="fixed top-0 left-0 w-full h-full ">
          <PerspectiveCamera position={[0, 0, 1]} makeDefault />
          <OrbitControls makeDefault enableZoom={false} />
          {/* <Background /> */}
        </View>
        <div className="container p-5 pb-20 mx-auto">
          <Hero></Hero>
          <div className="relative mt-5 overflow-hidden ">
            <div
              className="grid h-full w-full gap-5 overflow-hidden group grid-clos-1 md:grid-cols-2 lg:grid-cols-1"
              data-gird
            >
              {items.map((item, index) => (
                <Card key={index} name={item.name}>
                  <item.component />
                </Card>
              ))}
            </div>
            <div className="fixed top-0 left-0 z-20 w-full h-screen pointer-events-none ">
              <Canvas eventSource={document.getElementById("root")!}>
                <View.Port />
                <EtherealSynth />
                <MidiController />
                {/* <Perf position="top-left" /> */}
              </Canvas>
            </div>
          </div>
        </div>
      </div>
    </KeyboardControls>
  )
}
export default App
