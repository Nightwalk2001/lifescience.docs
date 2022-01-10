import {locale} from "@/libs"
import {
  axisBottom,
  axisLeft,
  axisRight,
  curveNatural,
  extent,
  format,
  line,
  scaleLinear,
  scaleOrdinal,
  scaleTime,
  select
} from "d3"
import {motion} from "framer-motion"
import React, {useEffect, useRef} from "react"
import worldData from "./json/global_case.json"
import worldDataMean from "./json/global_case_mean.json"

type Data = {
  date: string
  confirmed: number
  fatalities: number
  dailyCases: number
  dailyDeaths: number
}

type Point = {
  date: string
  count: number
}

const data = [
  worldData.map(i => ({date: i.date, count: i.dailyCases})),
  worldDataMean.map(i => ({date: i.date, count: i.dailyCases})),
  worldData.map(i => ({date: i.date, count: i.dailyDeaths})),
  worldDataMean.map(i => ({date: i.date, count: i.dailyDeaths}))
]

const legends = ["Daily Case", "Daily Case Mean/week", "Daily Death", "Daily Death Mean/week"]

export const CovidLineDaily = () => {
  const ref = useRef<SVGSVGElement>(null)

  const w      = 800,
        h      = 500,
        margin = {left: 40, right: 40, top: 50, bottom: 40},
        width  = w - margin.left - margin.right,
        height = h - margin.top - margin.bottom

  const x      = scaleTime()
          .domain([new Date("2020-01-22"), new Date("2021-05-29")])
          .range([0, width])
          .nice(),
        y      = scaleLinear()
          .domain(extent(worldData, i => i.dailyCases))
          .range([height, 0])
          .nice(),
        deathY = scaleLinear()
          .domain(extent(worldData, i => i.dailyDeaths))
          .range([height, 0])
          .nice(),
        color  = scaleOrdinal<string>()
          .range(["#57d7ec", "#3591ee", "#ea708d", "#ec3761"])

  useEffect(() => {
    const svg = select(ref.current)

    svg.select<SVGGElement>(".left")
      .call(axisLeft(y).tickFormat(format(".2s")))
      .call(g => g.selectAll(".tick line").clone()
        .attr("x2", width)
        .attr("stroke-opacity", 0.5))

    svg.select<SVGGElement>(".right")
      .call(axisRight(deathY).tickFormat(format(".2s")))

    svg.select<SVGGElement>(".bottom")
      .call(axisBottom(x)
        .ticks(8)
        .tickFormat(locale.format("%Y年%b月")))
  }, [])

  return <div className={"relative"}>
    <svg ref={ref} width={w} height={h}>
      <g transform={`translate(${margin.left}, ${margin.top})`} className={"root"}>
        <g className={"left"}/>
        <g className={"right"} transform={`translate(${width}, 0)`}/>
        <g className={"bottom"} transform={`translate(0, ${height})`}/>
        <g fill={"none"}>
          {data.map((d, i) =>
            <motion.path
              key={i}
              animate={{
                strokeDasharray: ["0, 30000", "30000, 30000"],
                transition: {duration: i % 2 === 1 ? 18 : 6, ease: "easeInOut"}
              }}
              d={line<Point>()
                .x(p => x(new Date(p.date)))
                .y(p => i > 1 ? deathY(p.count) : y(p.count))
                .curve(curveNatural)
                (d)}
              stroke={color(`${i}`)}
              strokeWidth={i % 2 === 1 ? 2 : 0.6}
            />)}
        </g>
      </g>
    </svg>

    <div className={"absolute left-[60px] top-[25px] flex flex-col space-y-3 px-3 py-2.5 bg-gray-100 rounded-md"}>
      {
        legends.map((d, i) => <div key={d} className={"flex items-center space-x-2"}>
          <div className={`w-[20px] h-[20px]`} style={{backgroundColor: color(`${i}`)}}/>
          <span className={"text-sm font-medium text-gray-700"}>{d}</span>
        </div>)
      }
    </div>
  </div>
}
