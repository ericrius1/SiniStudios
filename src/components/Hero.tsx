import { useStore } from "../store/useStore"

const Link = ({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) => {
  return (
    <a
      href={href}
      className="hover:underline underline-offset-2"
      target="_blank"
    >
      {children}
    </a>
  )
}

export const Hero = () => {
  const [index, setIndex] = useStore((state) => [state.index, state.setIndex])

  return (
    <div className=" w-full space-y-3 sm:space-y-5  border flex flex-col items-center justify-center  from-[#111111] to-[#181818] bg-gradient-to-t border-white/10 rounded-md p-5  md:p-10">
      <div className="flex items-center">
        <div className="flex items-center ">
          {/* <div className="hidden text-xs text-white/60 md:block">
            VARIATIONS
          </div>
          <div className="flex ml-4 space-x-2">
            {Array.from({ length: 4 }).map((_, key) => {
              return (
                <div
                  key={key}
                  className={`${
                    key === index
                      ? "text-white/100 bg-white/20"
                      : "text-white/60 bg-white/5 "
                  }  flex items-center justify-center rounded-sm w-6 h-6  md:w-8 md:h-8 transition-colors duration-300  cursor-pointer  bg-white/10 hover:bg-white/15  hover:text-white`}
                  onClick={() => {
                    setIndex(key)
                  }}
                >
                  <span className="text-xs md:text-sm">{key + 1}</span>
                </div>
              )
            })}
          </div> */}
        </div>
      </div>
      <div className="text-5xl text-transparent sm:text-6xl tangerine-bold md:text-8xl lg:text-9xl from-[#828282] to-white bg-gradient-to-l bg-clip-text ">
        Sini Studios
      </div>
    </div>
  )
}
