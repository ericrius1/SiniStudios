import { View, OrbitControls, PerspectiveCamera } from "@react-three/drei"
import React, { ReactNode, useState } from "react"
import { useIsVisible } from "../hooks/useIsVisible"

interface CardProps {
  name: string
  children: ReactNode
}

interface CardChildProps {
  active: boolean
}

const Card = ({ name, children }: CardProps) => {
  const [ref, isVisible] = useIsVisible({ threshold: 0.3 })
  const [isExpanded, setIsExpanded] = useState(false)
  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement<CardChildProps>(child)) {
      return React.cloneElement(child, { active: isExpanded })
    }
    return child
  })
  return (
    <div
      ref={ref}
      className={`relative flex flex-col justify-center items-center ${
        isExpanded ? "w-full md:w-4/5" : "w-full md:w-3/5"
      } mx-auto transition-all duration-300`}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div
        className={`relative rounded-md cursor-pointer bg-white/10 card p-[1px] w-full h-full`}
      >
        <View className="bg-purple-950/20 flex z-[2] bg-[#171717] aspect-square relative rounded-t-md">
          {childrenWithProps}
          <PerspectiveCamera position={[0, 0, 17.5]} makeDefault />
          {/* <OrbitControls /> */}
        </View>

        <div className="relative z-20 flex items-center mt-[1px] justify-between w-full px-4 py-2 bg-[#171717] rounded-b-md">
          <span className="w-1 h-1 rounded-full bg-white/20"></span>
          <span className="">{name}</span>
          <span className="w-1 h-1 rounded-full bg-white/20"></span>
        </div>

        <div
          className="absolute top-0 left-0 w-full h-full transition-opacity duration-500 rounded-md opacity-0 group-hover:opacity-100 z-1"
          style={{
            background: `radial-gradient(400px circle at var(--mouse-x) var(--mouse-y),rgba(255, 255, 255, 0.3),transparent 40%)`,
          }}
        ></div>
      </div>
    </div>
  )
}

export default Card
