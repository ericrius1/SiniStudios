import { create } from "zustand"

const textures = ["1.jpeg", "2.jpeg", "3.jpeg", "4.jpeg"]

interface Store {
  index: number
  texture: string
  setIndex: (num: number) => void
  midiNotes: Record<number, boolean>
  setMidiNote: (note: number, isPressed: boolean) => void
  cameraStream: MediaStream | null
  setCameraStream: (stream: MediaStream | null) => void
}

export const useStore = create<Store>((set) => ({
  index: 0,
  texture: textures[0],
  setIndex: (num: number) => set({ index: num, texture: textures[num] }),
  midiNotes: {},
  setMidiNote: (note, isPressed) =>
    set((state) => ({
      midiNotes: { ...state.midiNotes, [note]: isPressed },
    })),
  cameraStream: null,
  setCameraStream: (stream) => set({ cameraStream: stream }),
}))
