import { useEffect, useRef } from "react"
import { useStore } from "../store/useStore"

// Define the structure for an oscillator and its associated gain node
interface OscillatorPair {
  oscillator: OscillatorNode
  gainNode: GainNode
}

export const EtherealSynth = () => {
  // Create refs for audio context, oscillators map, and reverb node
  const audioContext = useRef<AudioContext | null>(null)
  const oscillators = useRef<Map<number, OscillatorPair>>(new Map())
  const reverbNode = useRef<ConvolverNode | null>(null)
  const midiNotes = useStore((state) => state.midiNotes)

  useEffect(() => {
    // Initialize audio context
    audioContext.current = new AudioContext()

    // Set up reverb
    reverbNode.current = audioContext.current.createConvolver()
    const reverbTime = 2 // Reverb duration in seconds
    const sampleRate = audioContext.current.sampleRate
    const impulseLength = sampleRate * reverbTime
    // Create a buffer for the impulse response
    const impulse = audioContext.current.createBuffer(
      2,
      impulseLength,
      sampleRate
    )

    // Generate a random impulse response for natural-sounding reverb
    for (let channel = 0; channel < 2; channel++) {
      const impulseData = impulse.getChannelData(channel)
      for (let i = 0; i < impulseLength; i++) {
        impulseData[i] =
          (Math.random() * 2 - 1) * Math.pow(1 - i / impulseLength, 2)
      }
    }

    // Set the impulse response and connect reverb to output
    reverbNode.current.buffer = impulse
    reverbNode.current.connect(audioContext.current.destination)

    // Clean up function to close audio context when component unmounts
    return () => {
      audioContext.current?.close()
    }
  }, [])

  const createOscillator = (frequency: number): OscillatorPair | undefined => {
    if (!audioContext.current || !reverbNode.current) return

    // Create and set up oscillator
    const oscillator = audioContext.current.createOscillator()
    oscillator.type = "sine"
    oscillator.frequency.setValueAtTime(
      frequency,
      audioContext.current.currentTime
    )

    // Create gain node for amplitude envelope
    const gainNode = audioContext.current.createGain()
    gainNode.gain.setValueAtTime(0, audioContext.current.currentTime)
    // Attack phase of the envelope
    gainNode.gain.linearRampToValueAtTime(
      0.2,
      audioContext.current.currentTime + 0.1
    )

    // Create and set up filter
    const filter = audioContext.current.createBiquadFilter()
    filter.type = "lowpass"
    filter.frequency.setValueAtTime(1000, audioContext.current.currentTime)
    filter.Q.setValueAtTime(10, audioContext.current.currentTime)

    // Create dry (unprocessed) and wet (reverb) gain nodes
    const dryGain = audioContext.current.createGain()
    dryGain.gain.setValueAtTime(0.7, audioContext.current.currentTime)

    const wetGain = audioContext.current.createGain()
    wetGain.gain.setValueAtTime(0.3, audioContext.current.currentTime)

    // Connect nodes: oscillator -> gain -> filter -> dry/wet mix -> output
    oscillator
      .connect(gainNode)
      .connect(filter)
      .connect(dryGain)
      .connect(audioContext.current.destination)

    // Send filtered signal to reverb
    filter.connect(wetGain).connect(reverbNode.current)

    oscillator.start()

    return { oscillator, gainNode }
  }

  const stopOscillator = (midiNote: number) => {
    const oscillatorPair = oscillators.current.get(midiNote)
    if (oscillatorPair && audioContext.current) {
      const releaseTime = 0.1
      const stopTime = audioContext.current.currentTime + releaseTime
      // Cancel any scheduled envelope changes
      oscillatorPair.gainNode.gain.cancelScheduledValues(
        audioContext.current.currentTime
      )
      // Set current gain value
      oscillatorPair.gainNode.gain.setValueAtTime(
        oscillatorPair.gainNode.gain.value,
        audioContext.current.currentTime
      )
      // Release phase of the envelope
      oscillatorPair.gainNode.gain.exponentialRampToValueAtTime(0.001, stopTime)
      // Stop the oscillator slightly after the release phase
      oscillatorPair.oscillator.stop(stopTime + 0.01)
      // Remove the oscillator from the map immediately
      oscillators.current.delete(midiNote)
    }
  }

  useEffect(() => {
    Object.entries(midiNotes).forEach(([midiNote, isPressed]) => {
      const note = parseInt(midiNote)
      if (isPressed) {
        if (!oscillators.current.has(note)) {
          const frequency = 440 * Math.pow(2, (note - 69) / 12)
          const oscillatorPair = createOscillator(frequency)
          if (oscillatorPair) {
            oscillators.current.set(note, oscillatorPair)
          }
        }
      } else {
        if (oscillators.current.has(note)) {
          stopOscillator(note)
        }
      }
    })
  }, [midiNotes])

  return null
}
