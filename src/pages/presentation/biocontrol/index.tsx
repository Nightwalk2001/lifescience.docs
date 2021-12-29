import DataCenter from "@/animation/data-center.json"
import NeuralNetwork from "@/animation/neural-network.json"
import {LottieReact} from "@/widgets"
import type {NextPage} from "next"
import {useRouter} from "next/router"

const Biocontrol: NextPage = () => {
  const router = useRouter()

  return <div className={"flex items-center w-3/4  h-screen container"}>
    <div className={"flex justify-between items-center"}>
      <LottieReact animation={DataCenter} className={"w-96 mb-32"}/>
      <div className={" grow flex flex-col pl-12"}>
        <h1 className={"text-5xl text-cyan-300 font-semibold"}>卷积神经网络在生物防治中的应用前景</h1>
        <div className={"flex space-x-3 mt-10 text-xl text-indigo-300"}>
          <div className={"flex flex-col"}>
            <span>素材及资料：</span>
            <span>课堂展示: </span>
          </div>
          <div className={"flex flex-col"}>
            <div>
              <span className={"font-semibold"}>谢宇清</span>、<span
              className={"font-semibold"}>温尚瑾</span>
            </div>
            <span className={"font-semibold"}>王志威</span>
          </div>
        </div>
      </div>
      <LottieReact animation={NeuralNetwork} className={"w-96 mt-16"}
                   onClick={() => router.push("/presentation/biocontrol/1")}/>
    </div>
  </div>
}

export default Biocontrol
