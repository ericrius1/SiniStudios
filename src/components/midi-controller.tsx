import { useEffect } from "react"
import { WebMidi } from "webmidi"
import { useStore } from "../store/useStore"

export const MidiController = () => {
  const setMidiNote = useStore((state) => state.setMidiNote)

  useEffect(() => {
    console.log("WebMidi enabled!")
    WebMidi.enable()
      .then(() => {
        const input = WebMidi.inputs[0]
        if (input) {
          input.addListener("noteon", (e) => {
            setMidiNote(e.note.number, true)
          })
          input.addListener("noteoff", (e) => {
            setMidiNote(e.note.number, false)
          })
        }
      })
      .catch(console.error)

    return () => {
      WebMidi.disable()
    }
  }, [setMidiNote])

  return null
}
