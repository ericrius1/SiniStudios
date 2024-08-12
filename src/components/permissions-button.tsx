import React from "react"
import { useCameraStream } from "../hooks/useCameraStream"

const PermissionsButton: React.FC = () => {
  const { stream, error, isRequesting, requestStream } = useCameraStream()

  if (stream) return null

  if (error) {
    return (
      <div className="fixed top-4 right-4 z-50 px-4 py-2 bg-red-500 text-white rounded">
        Camera Error: {error}
      </div>
    )
  }

  return (
    <button
      className="fixed bottom-4 left-4 z-50 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      onClick={requestStream}
      disabled={isRequesting}
    >
      {isRequesting ? "Requesting..." : "Enable Camera"}
    </button>
  )
}

export default PermissionsButton
