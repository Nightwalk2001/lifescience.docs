import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/outline"
import Image from "next/image"
import {useState} from "react"

const Biocontrol2 = () => {
  const [index, setIndex] = useState(1)

  const handlePrev = () => setIndex(index - 1),
        handleNext = () => setIndex(index + 1)

  return <>
    <div className={"container flex items-center w-[900px] h-max mx-auto my-10 text-gray-700"}>
      {
        index === 1
          ? <div className={"container h-12 mt-64 text-center text-5xl font-semibold"}>
            Part2——卷积神经网络及其原理简述
          </div>
          : index === 2
            ? <div className={"container flex justify-around items-center w-full"}>
              <Image src={"/biocontrol/nn.jpg"} width={420} height={280} quality={100}/>
              <Image src={"/biocontrol/ann.jpg"} width={380} height={300} quality={100}/>
            </div>
            : index === 3
              ? <div className={"container columns-2 w-full mx-auto text-center"}>
                <Image src={"/biocontrol/layer.png"} width={420} height={260} quality={100}/>
                <Image src={"/biocontrol/active.png"} width={450} height={240} quality={100}/>
                <Image src={"/biocontrol/hidden-layer.png"} width={450} height={240} quality={100}/>
                <Image src={"/biocontrol/active-fn.png"} width={400} height={200} quality={100}/>
              </div>
              : index === 4
                ? <div className={"container flex justify-around items-center w-full"}>
                  <Image src={"/biocontrol/fn.png"} width={500} height={400} quality={100}/>
                  <Image src={"/biocontrol/3d.png"} width={650} height={470} quality={100}/>
                </div>
                : <div className={"container flex flex-col items-center space-y-10 w-full"}>
                  <div className={"mb-10"}>
                    <Image src={"/biocontrol/cnn.png"} width={900} height={400} quality={100}/>
                  </div>
                  <div className={"w-[900px] mx-auto mb-10 text-3xl"}>
                    <h1><span className={"font-semibold text-cyan-400"}>卷积层</span>：卷积运算使原信号增强，并降低噪音</h1>
                    <h1><span className={"font-semibold text-cyan-400"}>降采样层</span>：降低训练参数量，预防模型过拟合</h1>
                  </div>
                  <div className={"mb-10"}>
                    <Image src={"/biocontrol/cnn-1.png"} width={900} height={400} quality={100}/>
                  </div>
                  <div className={"mb-10"}>
                    <Image src={"/biocontrol/cnn-2.png"} width={900} height={200} quality={100}/>
                  </div>
                  <div className={"mb-10"}>
                    <Image src={"/biocontrol/cnn-3.png"} width={900} height={300} quality={100}/>
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

export default Biocontrol2
