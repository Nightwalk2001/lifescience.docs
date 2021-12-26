import React, {useRef} from "react"

const Biocontrol3 = () => {
  const ref = useRef<HTMLAudioElement>(null)
  const handlePlay = () => {
    if (ref.current) ref?.current.play().then()
  }
  return <>
    <audio ref={ref} src={"/cn.mp3"} controls className={"hidden"}/>
    <div
        className={"flex items-center w-[800px] mx-auto h-[300px] text-7xl font-semibold bg-gradient-to-r from-fuchsia-600 to-sky-600 gradient cursor-pointer"}
        onClick={handlePlay}>
      Thanks for listening!
    </div>
  </>
}

export default Biocontrol3
