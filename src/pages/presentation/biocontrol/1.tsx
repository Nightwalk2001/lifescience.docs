import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/outline"
import Image from "next/image"
import {useState} from "react"

const Biocontrol1 = () => {
  const [index, setIndex] = useState(1)

  const handlePrev = () => setIndex(index - 1),
        handleNext = () => setIndex(index + 1)

  return <>
    <div className={"container flex items-center w-[900px] h-[480px] mx-auto my-10 text-gray-700"}>
      {
        index === 1
          ? <div className={"container h-12 text-center text-5xl font-semibold"}>
            Part1——题目背景、应用前景
          </div>
          : <div className={"container flex flex-col items-center"}>
            <div className={"flex justify-around items-center w-full"}>
              <Image src={"/biocontrol/ml.png"} width={400} height={240} quality={100}/>
              <Image src={"/biocontrol/bug.jpg"} width={400} height={280} quality={100}/>
            </div>
          </div>
      }
    </div>
    <ChevronLeftIcon
      className={"fixed left-5 top-1/2 -translate-y-1/2 w-8 h-8 cursor-pointer transition hover:text-cyan-300"}
      onClick={handlePrev}/>
    <ChevronRightIcon
      className={"fixed right-5 top-1/2 -translate-y-1/2 w-8 h-8 cursor-pointer transition hover:text-cyan-300"}
      onClick={handleNext}/>
  </>
}

export default Biocontrol1
