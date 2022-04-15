import {useSvgSize}                                                                from "@/hooks"
import {AxisBottom}                                                                from "@visx/axis"
import {arc, max, pie, PieArcDatum, scaleBand, scaleOrdinal, scaleSequential, sum} from "d3"
import {motion}                                                                    from "framer-motion"
import {Fragment}                                                                  from "react"
import experiment                                                                  from "./experiment.json"
import theory                                                                      from "./theory.json"

type dict = { [key: string]: number }

type Comment = {
  name: string
  scores: dict
  mean: number
  systemic?: dict
  systemicMean?: number
  mostLoved: dict
  duplicate: dict
  others: string[]
}[]

type BarProps = {
  name: string
  barData: dict
}

const numberGroups = ["1.0", "2.0", "3.0", "4.0", "5.0"],
      strGroups    = ["很差", "较差", "一般", "良好", "优秀"]
const BarChart = ({name, barData}: BarProps) => {
  const margin                = {left: 0, right: 0, top: 20, bottom: 30},
        {w, h, width, height} = useSvgSize(380, 260, margin)

  const band = scaleOrdinal<string, string>()
          .domain(numberGroups)
          .range(strGroups),
        x    = scaleBand()
          .domain(strGroups)
          .range([0, width])
          .padding(.25),
        y    = scaleSequential()
          .domain([0, max(Object.values(barData))])
          .range([height, 0]),
        fill = scaleOrdinal<string>()
          .domain(numberGroups)
          .range(defaultColors)

  return <svg width={w} height={h}>
    <g transform={`translate(${margin.left}, ${margin.top})`}>
      <AxisBottom top={height} scale={x} hideTicks stroke={"#a2a4a6"} strokeWidth={1.3}
                  tickLabelProps={() => ({fill: "#656363", fontSize: 12, textAnchor: "middle"})}/>
      {Object.entries(barData)
        .map(([k, v]) =>
          <Fragment key={name + k}>
            <rect
              x={x(band(k))}
              y={y(v)}
              width={x.bandwidth()}
              height={height - y(v)}
              fill={fill(k)}
              fillOpacity={0.7}
              rx={2}
            />
            <text x={x(band(k)) + x.bandwidth() / 2} y={y(v) - 8} textAnchor={"middle"} fontSize={15}
                  fill={"#616569"}>{v}</text>
          </Fragment>)}
    </g>
  </svg>
}

type Data = [string, number]

type PieChartProps = {
  name: string
  data: dict
  width?: number
  height?: number
  margin?: number
  padAngle?: number
  innerRadius?: number
  outerRadius?: number
  cornerRadius?: number
  colors?: string[]
  opacity?: number
  hoverScale?: number
  hoverOpacity?: number
}

const defaultColors = [
  "rgb(62,238,211)",
  "rgb(87,215,236)",
  "rgba(255,211,12,0.88)",
  "rgba(126,10,241,0.5)",
  "rgb(236,55,97)",
  "rgba(229,53,255,0.9)"
]

export const PieChart = ({
                           name,
                           data,
                           width = 300,
                           height = 300,
                           margin = 30,
                           padAngle = 0.025,
                           innerRadius = 70,
                           outerRadius = Math.min(width, height) / 2 - margin,
                           cornerRadius = 5,
                           colors = defaultColors,
                           opacity = 0.65,
                           hoverScale = 1.03,
                           hoverOpacity = 0.95

                         }: PieChartProps) => {

  const dataReady = Object.entries(data).sort(([k1], [k2]) => +k1 - +k2),
        total     = sum(dataReady, d => d[1])

  const pies = pie<Data>().value(d => d[1])(dataReady)

  const arcFn = arc<PieArcDatum<Data>>()
    .padAngle(padAngle)
    .innerRadius(innerRadius)
    .outerRadius(outerRadius)
    .cornerRadius(d => d.value / total >= 0.1 ? cornerRadius : 0)

  const color = scaleOrdinal<string>().range(colors)

  return <div className={"flex items-center space-x-1 w-fit"}>
    <div className={"flex flex-col space-y-2.5 x-center"}>
      {dataReady.map((d, i) =>
        <div key={d[0]} className={"flex items-center space-x-1"}>
          <div className={"w-[20px] h-[20px]"} style={{backgroundColor: color(`${i}`)}}/>
          <span className={"text-gray-600"}>{d[0]}</span>
        </div>)}
    </div>
    <svg width={width} height={height}>
      <g transform={`translate(${width / 2}, ${height / 2})`}>
        {pies.map((d, i) =>
          <Fragment key={`${name}-${d.startAngle}-${d.endAngle}`}>
            <motion.path
              d={arcFn(d)!}
              fill={color(`${i}`)}
              opacity={opacity}
              whileHover={{scale: hoverScale, opacity: hoverOpacity}}
            />
            <text transform={`translate(${arcFn.centroid(d)})`} textAnchor={"middle"} fill={"#fff"}>
              {d.value / total >= 0.05 && `${Math.round(d.value / total * 100)}%`}
            </text>
          </Fragment>)}
      </g>
    </svg>
  </div>
}

type CardProps = {
  data: Comment
}

const CourseCard = ({data}: CardProps) => <>
  {data.map(d => <div key={d.name} className={"mt-24"}>
    <div className={"text-2xl text-gray-600 font-semibold"}>{d.name}</div>

    <h2
      className={"my-3 text-lg text-gray-700  font-semibold"}>
      一、课程总体评价(平均得分: {d.mean.toFixed(3)} {d.systemicMean && `知识系统性得分: ${d.systemicMean.toFixed(3)}`})
    </h2>

    <div className={`grid ${d.systemic
      ? "grid-cols-2 justify-items-center"
      : "grid-cols-3 gap-x-4"
    } items-center`}>
      <PieChart data={d.scores} name={d.name}/>
      {d.systemic && <PieChart data={d.systemic} name={d.name}/>}
      <BarChart name={d.name} barData={d.scores}/>

      <div className={"ml-12 space-y-2.5"}>
        <h2 className={"text-lg text-gray-700  font-semibold"}>二、印象最深刻的老师</h2>
        <div className={"space-x-1"}>{Object.entries(d.mostLoved).map(([k, v]) => <span key={k}>{k}({v})、</span>)}</div>
        <h2 className={"text-lg text-gray-700  font-semibold"}>三、和其他课程重复的内容</h2>
        <div className={"space-x-1"}>{Object.entries(d.duplicate).map(([k, v]) => <span key={k}>{k}({v})、</span>)}</div>
        <h2 className={"text-lg text-gray-700 font-semibold"}>四、其它意见和建议</h2>
        <div>{d.others.map((d, i) => <span key={d}>{i + 1}、{d} <br/></span>)}</div>
      </div>
    </div>
  </div>)}
</>

const comment = () => <div className={"px-20 max-w-[1300px] mx-auto"}>
  <h1
    className={"mt-18 text-3xl text-transparent bg-gradient-to-r from-sky-900 via-purple-800 to-indigo-300 bg-clip-text font-semibold"}>
    理论课学生评教结果
  </h1>
  <CourseCard data={theory}/>
  <h1
    className={"mt-18 text-3xl text-transparent bg-gradient-to-r from-indigo-300 via-purple-800 to-sky-900 bg-clip-text font-semibold"}>
    实验课学生评教结果
  </h1>
  <CourseCard data={experiment}/>
</div>

export default comment
