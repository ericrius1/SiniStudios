import { useCallback, useEffect, useState } from "react"
import { useStore } from "../store/useStore"

export const useCameraStream = () => {
  const { cameraStream, setCameraStream } = useStore()
  const [error, setError] = useState<string | null>(null)
  const [isRequesting, setIsRequesting] = useState(false)

  const requestStream = useCallback(async () => {
    if (cameraStream || isRequesting) return
    setIsRequesting(true)
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
      })
      setCameraStream(mediaStream)
      setError(null)
    } catch (err) {
      setError("Error accessing camera: " + (err as Error).message)
    } finally {
      setIsRequesting(false)
    }
  }, [cameraStream, isRequesting, setCameraStream])

  useEffect(() => {
    return () => {
      if (cameraStream) {
        cameraStream.getTracks().forEach((track) => track.stop())
        setCameraStream(null)
      }
    }
  }, [cameraStream, setCameraStream])

  return { stream: cameraStream, error, isRequesting, requestStream }
}
