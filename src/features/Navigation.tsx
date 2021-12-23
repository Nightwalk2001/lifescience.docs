import "@docsearch/css"
import {DocSearch} from "@docsearch/react"
import {SunIcon} from "@heroicons/react/outline"
import Image from "next/image"
import React from "react"

export const Navigation: React.FC = () => {

  const linkClass = ({isActive}: { isActive: boolean; }) => `hover:text-indigo-200 ${isActive && "text-indigo-400 font-semibold"}`

  return <div className={"relative px-8 pt-6 lg:pt-8 flex items-center justify-between text-gray-700 font-semibold text-sm leading-6 dark:text-gray-200"}>

    <div className={"flex items-center space-x-1 cursor-pointer"}>
      <Image
        src={"/llvm.svg"}
        alt={"back to home"}
        width={40}
        height={40}
      />
      <span className={"font-ff font-semibold text-2xl tracking-tighter text-[#0f172a]"}>zhiwei.wang</span>
    </div>

    <div className={"flex justify-between items-center w-[450px] text-md font-semibold text-gray-600"}>

      <div className={"flex space-x-4"}>
        <div>Papers</div>

        <div>Presentation</div>

        <div>Contact</div>
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
}
