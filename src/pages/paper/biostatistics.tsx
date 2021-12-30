import {CovidTreemap, GeoTest} from "@/charts"
import type {NextPage} from "next"

const biostatistics: NextPage = () => <div
  className={"flex flex-col items-center min-w-[1000px] max-w-[1000px] mx-auto prose"}>
  <h1 className={"text-center"}>基于Covid-19数据的数据分析和可视化</h1>
  <text className={"self-start font-semibold"}>
    王志威-19331144 梁靖雯- 陈娟-
  </text>
  <p><strong>摘要：</strong>许多患有染色体缺陷病的新生儿，如果能及早发现并辅以遗传治疗，具有不可估量的意义，如果想凭肉眼判断幼儿是否患有遗传缺陷病，往往需要丰富的经验，要让人信服又需要足够的资历，而具有丰富经验资历的医生是一个较小的群体，在理想情况下，深度学习在图像识别上可以达到99%以上的准确率，有望作为一个很好的辅助判断工具。
  </p>
  <p className={"self-start"}><strong>关键词：</strong>深度学习 图像识别 染色体缺陷病 儿童疾病 遗传治疗</p>
  <p className={"self-start"}>
    下面是使用各国家感染者数量画出的树图
  </p>
  <pre className={"!w-3/4 !text-white !bg-gray-400 !px-2 !py-1.5"}>
    {`
    const root = hierarchy(TestData, d => d.children)
    .sum(i => i.confirmed)
    .sort((a, b) => b.confirmed - a.confirmed)
    
    const rootWithPosition = treemap().size([width, height])(root)

    svg.selectAll("rect")
      .data(rootWithPosition)
      .join("rect")
      .attr("x", d => d.x0)
      .attr("y", d => d.y0)
      .attr("width", d => d.x1 - d.x0)
      .attr("height", d => d.y1 - d.y0)
      .style("stroke", "#ec77c7")
      `}
  </pre>
  <CovidTreemap className={"w-[900px] h-[500px]"}/>
  <p className={"self-start"}>
    下面是使用各国家感染者数量画出的地理图
  </p>
  <GeoTest className={"w-[900px] h-[400px]"}/>
</div>

export default biostatistics
