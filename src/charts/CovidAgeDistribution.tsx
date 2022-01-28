import {useAnimateOnce, useSvgSize} from "@/hooks"
import {AxisBottom, AxisLeft} from "@visx/axis"
import {Grid} from "@visx/grid"
import {groups, max, min, pointer, scaleBand, scaleLinear} from "d3"
import {motion} from "framer-motion"
import React, {useState} from "react"
import ageDistribution from "../json/korea_age_distribution.json"

const data = groups(ageDistribution, i => i.age)
  .sort((a, b) => +a[0].slice(0, a[0].length - 2) - +b[0].slice(0, b[0].length - 2))

const legends = [{
  sex: "male",
  color: "#57d7ec"
}, {
  sex: "female",
  color: "#ec77c7"
}]

type Tooltip = {
  x: number
  y: number
  male: string
  female: string
} | null

export const CovidAgeDistribution = () => {
  const {ref, inView} = useAnimateOnce()
  const [tooltip, setTooltip] = useState<Tooltip>(null)

  const margin                = {left: 50, right: 30, top: 20, bottom: 40},
        {w, h, width, height} = useSvgSize(900, 500, margin)

  const x = scaleBand()
          .domain(new Set(data.map(i => i[0])))
          .range([0, width])
          .padding(0.15),
        y = scaleLinear()
          .domain([
            Math.min(
              min(data, i => i[1].filter(i => i.sex === "male").length),
              min(data, i => i[1].filter(i => i.sex === "female").length)
            ),
            Math.max(
              max(data, i => i[1].filter(i => i.sex === "male").length),
              max(data, i => i[1].filter(i => i.sex === "female").length)
            )
          ])
          .range([height, 0])

  // useEffect(() => {
  //   console.log(data)
  // })

  const handleMouse = (event: any, male: number, female: number, total: number) => {
    const pos = pointer(event)
    setTooltip({
      x: pos[0],
      y: pos[1],
      male: `${male}人(${Math.round((male / total * 100))}%)`,
      female: `${female}人(${Math.round((female / total * 100))}%)`
    })
  }

  return <div ref={ref} className={"relative"}>

    <svg width={w} height={h}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <AxisLeft
          scale={y}
          hideTicks
          hideAxisLine
          label={"确诊人数"}
          labelOffset={30}
          labelProps={{fontSize: 12, textAnchor: "middle", fill: "#606162"}}
        />
        <AxisBottom
          scale={x}
          top={height}
          hideTicks
          label={"年龄段(每十岁为一段)"}
          labelProps={{fontSize: 12, textAnchor: "middle", fill: "#606162"}}
        />
        <Grid width={width} height={height} xScale={x} yScale={y}/>
        {data.map(d => {

          const age         = d[0],
                maleCount   = d[1].filter(i => i.sex === "male").length,
                femaleCount = d[1].filter(i => i.sex === "female").length,
                total       = maleCount + femaleCount

          return <g
            key={age}
            className={"cursor-pointer"}
            onMouseEnter={(event) => handleMouse(event, maleCount, femaleCount, total)}
            onMouseMove={(event) => handleMouse(event, maleCount, femaleCount, total)}
            onMouseLeave={() => setTooltip(null)}
          >
            <motion.rect
              animate={{
                y: [height, inView ? y(maleCount) : height],
                height: [0, inView ? height - y(maleCount) : 0]
              }}
              x={x(age)}
              width={x.bandwidth() / 2}
              fill={"#57d7ec"}
            />
            <motion.rect
              animate={{
                y: [height, inView ? y(femaleCount) : height],
                height: [0, inView ? height - y(femaleCount) : 0]
              }}
              x={x(age) + x.bandwidth() / 2}
              width={x.bandwidth() / 2}
              fill={"#ec77c7"}
            />
          </g>
        })}
      </g>
    </svg>

    <div className={"absolute right-[80px] top-[75px] flex flex-col space-y-1.5 px-3 py-2.5 bg-gray-100 rounded-md"}>
      {legends.map(i => <div key={i.sex} className={"flex items-center space-x-2 cursor-pointer"}>
        <div className={`w-[20px] h-[20px] bg-blue-400`} style={{backgroundColor: i.color}}/>
        <span className={"text-sm font-medium text-gray-700"}>{i.sex}</span>
      </div>)}
    </div>

    {
      tooltip &&
      <div
        className={`absolute flex flex-col min-w-[140px] max-w-[350px] px-3 py-2.5 text-sm text-purple-400 bg-white rounded-md`}
        style={{
          left: tooltip.x - 5,
          top: tooltip.y + 30
        }}>
        <div><span className={" font-semibold"}>男性确诊：</span><span>{tooltip.male}</span></div>
        <div><span className={" font-semibold"}>女性确诊：</span><span>{tooltip.female}</span></div>
      </div>
    }
  </div>
}
