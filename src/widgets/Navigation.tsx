import {NavPopover} from "@/widgets/index"
import "@docsearch/css"
import {DocSearch} from "@docsearch/react"
import {Popover} from "@headlessui/react"
import {SunIcon} from "@heroicons/react/outline"
import Link from "next/link"
import React from "react"

export const Navigation: React.FC = () => <div
  className={"relative px-16 pt-6 lg:pt-8 flex items-center justify-between text-gray-700 font-semibold text-sm leading-6 dark:text-gray-200"}>

  <Link href={"/"} passHref>
    <div className={"flex items-center space-x-1 cursor-pointer"}>
      <img
        src={require("@/images/nav/riseup.svg").default}
        alt={"back to home"}
        width={34}
        height={34}
      />
      <span className={"font-ff font-semibold text-2xl tracking-tighter text-[#0f172a]"}>zhiwei.wang</span>
    </div>
  </Link>

  <div className={"flex justify-between items-center w-[450px] text-md text-gray-600"}>

    <div className={"flex space-x-4"}>
      <NavPopover
        btn={<span className={"font-semibold transition hover:text-[#38bdf8]"}>Paper</span>}
        panel={
          <Popover.Panel
            className={`absolute z-10 w-screen max-w-xs py-4 mt-1
                transform -translate-x-1/2 left-1/2 bg-white rounded-lg shadow-sm sm:pl-2`}>
            <div className={"flex flex-col items-start space-y-3 px-5"}>
              <SvgLink logo={"face.svg"} to={"/paper/genetics"} title={"遗传学"}
                       subtitle={"面容识别预测新生儿的遗传性疾病"}/>
              <SvgLink logo={"bug.svg"} to={"/paper/bristles"} title={"遗传学实验"}
                       subtitle={"利用黑腹果蝇腹板刚毛数探究数量性状遗传规律"}/>
              <SvgLink logo={"cell.svg"} to={"/paper/genetics-experiment/sialaden"} title={"遗传学实验"}
                       subtitle={"关于果蝇唾液腺染色体的实验报告"}/>
              <SvgLink logo={"virus.svg"} to={"/paper/biostatistics"} title={"生物统计学"}
                       subtitle={"Covid-19对全球情况和特定国家的数据分析和可视化"}/>
            </div>
          </Popover.Panel>
        }/>

      <NavPopover
        btn={<span className={"font-semibold transition hover:text-[#38bdf8]"}>Presentation</span>}
        panel={
          <Popover.Panel
            className={`absolute z-10 w-screen max-w-xs py-4 mt-1
                transform -translate-x-1/2 left-1/2 bg-white rounded-lg shadow-sm sm:pl-2`}>
            <div className={"flex flex-col items-start space-y-3 px-5"}>
              <SvgLink logo={"ai-network.svg"} to={"/presentation/biocontrol"} title={"生物防治"}
                       subtitle={"卷积神经网络、隐马尔可夫模型与生物防治"}/>
              <SvgLink logo={"plant.svg"} to={"/presentation/biocontrol"} title={"代谢组学"}
                       subtitle={"基于质谱的代谢组学——注释、量化和最佳报告实践指南"}/>
              <SvgLink logo={"data.svg"} to={"/presentation/biocontrol"} title={"肿瘤学"}
                       subtitle={"MSL1替代聚腺苷酸化的转变保护癌细胞化疗药物诱导的细胞凋亡"}/>
            </div>
          </Popover.Panel>
        }/>

      <div className={"font-semibold"}>Contact</div>
    </div>

    <div className={"w-[1px] h-[25px] bg-[#e2e8f0]"}/>

    <div className={"flex justify-between items-center"}>
      <SunIcon className={"w-6 h-6 text-cyan-500 cursor-pointer"}/>
      <DocSearch
        appId="R2IYF7ETH7"
        apiKey="599cec31baffa4868cae4e79f180729b"
        indexName="docsearch"
      />
    </div>

  </div>
</div>

type SvgLinkProps = {
  logo: string
  to: string
  title: string
  subtitle: string
}

const SvgLink: React.FC<SvgLinkProps> = ({logo, to, title, subtitle}) =>
  <div className={"flex justify-between w-full"}>
    <img src={require(`@/images/nav/${logo}`).default} width={46} height={46} alt={""}/>
    <div className={"flex flex-col justify-start space-y-0.5 grow max-w-[215px]"}>
      <Link href={to} passHref>
        <span
          className={"text-md font-semibold text-gray-500 cursor-pointer transition hover:text-indigo-300"}>{title}</span>
      </Link>
      <span className={"text-sm font-normal"}>{subtitle}</span>
    </div>
  </div>
