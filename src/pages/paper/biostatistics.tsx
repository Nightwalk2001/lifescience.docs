import {CovidTreemap, GeoTest} from "@/charts"
import type {NextPage} from "next"

const biostatistics: NextPage = () => <div
  className={"flex flex-col items-center min-w-[1000px] max-w-[1000px] mx-auto prose"}>
  <h1 className={"text-center"}>基于Covid-19数据的数据分析和可视化</h1>
  <text className={"self-start font-semibold"}>
    王志威-19331144 梁靖雯- 陈娟-
  </text>
  <p className={"self-start"}>
    下面是使用各国家感染者数量画出的树图
  </p>
  <CovidTreemap className={"w-[900px] h-[500px]"}/>
  <p className={"self-start"}>
    下面是使用各国家感染者数量画出的地理图
  </p>
  <GeoTest className={"w-[900px] h-[400px]"}/>
</div>

export default biostatistics
