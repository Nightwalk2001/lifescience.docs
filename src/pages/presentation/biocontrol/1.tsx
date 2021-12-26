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
              <div className={"text-xl ml-24"}>
                <h1>深度学习——根据现有数据，提取出特征，善于找到极复杂事务的内在规律</h1>
                <h1>强化学习——根据之前行为得到的奖励，影响乃至决定下一步行动，善于作出决策</h1>
              </div>
            </div>
            <div className={"flex justify-around w-full"}>
              <Image src={"/biocontrol/911.png"} width={620} height={144} quality={100}/>
              <Image src={"/biocontrol/pngsucai.png"} width={260} height={220} quality={100}/>
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
