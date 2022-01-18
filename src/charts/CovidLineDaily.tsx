import {locale} from "@/libs"
import {AxisBottom, AxisLeft, AxisRight} from "@visx/axis"
import {Grid} from "@visx/grid"
import {curveNatural, extent, format, line, scaleLinear, scaleOrdinal, scaleTime} from "d3"
import {motion} from "framer-motion"
import React from "react"
import {useInView} from "react-intersection-observer"
import data from "./json/covid_daily.json"

type Point = {
  date: string
  count: number
}

const legends = ["Daily Case", "Daily Case Mean/week", "Daily Death", "Daily Death Mean/week"]

export const CovidLineDaily = () => {
  const {ref, inView} = useInView({triggerOnce: true})

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
          .domain(extent(data[0], i => i.count))
          .range([height, 0])
          .nice(),
        deathY = scaleLinear()
          .domain(extent(data[2], i => i.count))
          .range([height, 0])
          .nice(),
        color  = scaleOrdinal<string>()
          .range(["#57d7ec", "#3591ee", "#ea708d", "#ec3761"])

  return <div ref={ref} className={"relative"}>
    <svg width={w} height={h}>
      <g transform={`translate(${margin.left}, ${margin.top})`} className={"root"}>
        <AxisLeft scale={y} hideTicks tickFormat={format(".2s")}/>
        <AxisRight scale={deathY} left={width} hideTicks tickFormat={format(".2s")}/>
        <AxisBottom scale={x} top={height} hideTicks tickFormat={locale.format("%Y年%b月")} numTicks={8}/>
        <Grid width={width} height={height} xScale={x} yScale={y}/>
        <g fill={"none"}>
          {data.map((d, i) =>
            <motion.path
              key={i}
              d={line<Point>()
                .x(p => x(new Date(p.date)))
                .y(p => i > 1 ? deathY(p.count) : y(p.count))
                .curve(curveNatural)
                (d)}
              stroke={color(`${i}`)}
              strokeWidth={i % 2 === 1 ? 2 : 0.6}
              strokeOpacity={0.7}
              className={"cursor-pointer"}
              animate={{
                strokeDasharray: ["0, 30000", inView ? "30000, 30000" : "0, 30000"],
                transition: {duration: i % 2 === 1 ? 18 : 6, ease: "easeInOut"}
              }}
              whileHover={{strokeWidth: i % 2 === 1 ? 5 : 1.5, strokeOpacity: 1}}
            />)}
        </g>
      </g>
    </svg>

    <div className={"absolute left-[60px] top-[25px] flex flex-col space-y-3 px-3 py-2.5 bg-gray-100 rounded-md"}>
      {
        legends.map((d, i) => <div key={d} className={"flex items-center space-x-2 cursor-pointer"}>
          <div className={`w-[20px] h-[20px]`} style={{backgroundColor: color(`${i}`)}}/>
          <span className={"text-sm font-medium text-gray-700"}>{d}</span>
        </div>)
      }
    </div>
  </div>
}
