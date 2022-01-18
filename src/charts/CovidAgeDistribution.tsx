import {useSvgSize} from "@/hooks"
import {AxisBottom, AxisLeft} from "@visx/axis"
import {Grid} from "@visx/grid"
import {groups, max, min, scaleBand, scaleLinear} from "d3"
import React, {useEffect} from "react"
import {useInView} from "react-intersection-observer"
import ageDistribution from "./json/korea_age_distribution.json"

const data = groups(ageDistribution, i => i.age)
  .sort((a, b) => +a[0].slice(0, a[0].length - 2) - +b[0].slice(0, b[0].length - 2))

const legends = [{
  sex: "male",
  color: "#57d7ec"
}, {
  sex: "female",
  color: "#ec77c7"
}]

export const CovidAgeDistribution = () => {
  const {ref, inView} = useInView({triggerOnce: true})

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

  useEffect(() => {
    console.log(data)
  })

  return <div ref={ref} className={"relative"}>

    <svg width={w} height={h}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <AxisLeft
          scale={y}
          hideTicks
          hideAxisLine
          label={"确诊人数"}
          labelOffset={30}
          labelProps={{fontSize: 12, fill: "#606162"}}
        />
        <AxisBottom
          scale={x}
          top={height}
          hideTicks
          label={"年龄段(每十年为一段)"}
          labelProps={{fontSize: 12, textAnchor: "middle", fill: "#606162"}}
        />
        <Grid width={width} height={height} xScale={x} yScale={y}/>
        {data.map((d, i) =>
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
          </React.Fragment>)}
      </g>
    </svg>

    <div className={"absolute right-[80px] top-[75px] flex flex-col space-y-1.5 px-3 py-2.5 bg-gray-100 rounded-md"}>
      {legends.map(i => <div key={i.sex} className={"flex items-center space-x-2 cursor-pointer"}>
        <div className={`w-[20px] h-[20px] bg-blue-400`} style={{backgroundColor: i.color}}/>
        <span className={"text-sm font-medium text-gray-700"}>{i.sex}</span>
      </div>)}
    </div>
  </div>
}
