import {
  CovidAgeDistribution,
  CovidGeoIndia,
  CovidGeoUsa,
  CovidGeoWorld,
  CovidLineDaily,
  CovidLineTrend,
  CovidScatterDensity,
  CovidTreemap
} from "@/charts"
import type {NextPage} from "next"

const biostatistics: NextPage = () => <div
  className={"flex flex-col items-center min-w-[900px] max-w-[80%] mx-auto prose"}>
  <h1 className={"!mt-12 text-center"}>基于Covid-19数据的数据分析和可视化</h1>
  <text className={"self-start font-semibold"}>
    王志威-19331144 梁靖雯-18323052 陈娟-19331010
  </text>
  <p><strong>摘要：</strong>许多患有染色体缺陷病的新生儿，如果能及早发现并辅以遗传治疗，具有不可估量的意义，如果想凭肉眼判断幼儿是否患有遗传缺陷病，往往需要丰富的经验，要让人信服又需要足够的资历，而具有丰富经验资历的医生是一个较小的群体，在理想情况下，深度学习在图像识别上可以达到99%以上的准确率，有望作为一个很好的辅助判断工具。
  </p>
  <p className={"self-start"}><strong>关键词：</strong>深度学习 图像识别 染色体缺陷病 儿童疾病 遗传治疗</p>
  <p className={"self-start"}>
    下面是使用各国家感染者数量画出的树图
  </p>
  <CovidTreemap/>
  <pre className={"!text-gray-900 !bg-gray-100 !px-2 !py-1.5 !w-full"}>
    {`
    {
      data.map((d, i) =>
      <React.Fragment key={d[0]}>
        <rect
          x={x(d[0])}
          y={y(d[1].filter(i => i.sex === "male").length)}
          width={x.bandwidth() / 2}
          height={height - y(d[1].filter(i => i.sex === "male").length)}
          fill={"#57d7ec"}
        />
        <rect
          x={x(d[0]) + x.bandwidth() / 2}
          y={y(d[1].filter(i => i.sex === "female").length)}
          width={x.bandwidth() / 2}
          height={height - y(d[1].filter(i => i.sex === "female").length)}
          fill={"#ec77c7"}
        />
      </React.Fragment>)
    }
      `}
  </pre>
  <p className={"self-start"}>
    下面是使用各国家感染者数量画出的地理图，颜色越深表示感染者数量越多，由于美国与印度、巴西的感染者数量远高于其它国家或地区，所以将他们单独拿出来画一个地图。
  </p>
  <CovidGeoWorld/>
  <p className={"self-start"}>
    下面是美国的感染者地图，其中阿拉斯加州和夏威夷群岛均位于美国大陆的左下方
  </p>
  <CovidGeoUsa/>
  <p className={"self-start"}>
    印度的感染者地图，其中Andaman and Nicobar省未计入。
  </p>
  <CovidGeoIndia/>
  <p className={"self-start"}>
    下面是2021年5月24号到5月31号全球每天感染数量和死亡数量图
  </p>
  <CovidLineDaily/>
  <CovidLineTrend/>
  <CovidScatterDensity/>
  <CovidAgeDistribution/>
</div>

export default biostatistics
