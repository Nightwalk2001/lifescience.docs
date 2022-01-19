import {useMinMax, useSvgSize, useUtc} from "@/hooks"
import {locale} from "@/libs"
import {AxisBottom, AxisLeft} from "@visx/axis"
import {Grid} from "@visx/grid"
import {curveMonotoneX, format, line, scaleOrdinal} from "d3"
import {motion} from "framer-motion"
import React from "react"
import {useInView} from "react-intersection-observer"
import data from "../json/global_trend.json"

const countries = ["US", "Brazil", "France", "Germany", "India", "Italy", "Russia", "UK", "Argentina", "Turkey"]

export const CovidLineTrend = () => {
  const {ref, inView} = useInView({triggerOnce: true})

  const margin                = {left: 60, right: 20, top: 50, bottom: 40},
        {w, h, width, height} = useSvgSize(900, 500, margin)

  const x     = useUtc("2020-01-22", "2021-05-29", width),
        y     = useMinMax(data[0].trend.map(i => i.cases), height),
        color = scaleOrdinal<string>()
          .range([
            "#636efa", "#ee553b", "#00cb95", "#aa63f9",
            "#fda059", "#19d1f1", "#fe6691", "#b5e77f",
            "#ff97ff", "#fecb52"
          ])

  return <div ref={ref} className={"relative"}>
    <svg width={w} height={h}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <AxisLeft
          scale={y}
          hideTicks
          hideZero
          tickFormat={format(".2s")}
          label={"全国确诊数"}
          labelOffset={40}
          labelProps={{fontSize: 12, textAnchor: "middle", fill: "#606162"}}
        />
        <AxisBottom scale={x} hideTicks top={height} tickFormat={locale.format("%Y年%b月")} numTicks={8}/>
        <Grid width={width} height={height} xScale={x} yScale={y}/>
        <g className={"left"}/>
        <g className={"bottom"} transform={`translate(0, ${height})`}/>
        <g fill={"none"}>
          {data.map((d, i) => <motion.path
            key={d.country}
            d={line<{ date: string, cases: number }>()
              .x(p => x(new Date(p.date)))
              .y(p => y(p.cases))
              .curve(curveMonotoneX)
              (d.trend)
            }
            stroke={color(`${i}`)}
            strokeWidth={2}
            strokeOpacity={0.7}
            className={"cursor-pointer"}
            animate={{
              strokeDasharray: ["0, 1400", inView ? "1400, 1400" : "0, 1400"],
              transition: {duration: 1, delay: i * 1.02 + 0.5}
            }}
            whileHover={{strokeWidth: 5, strokeOpacity: 1}}
          />)}
        </g>
      </g>
    </svg>

    <div className={"absolute left-[100px] top-[25px] flex flex-col space-y-1 p-2 bg-gray-100 rounded-md"}>
      {countries.map((d, i) => <div key={d} className={"flex items-center space-x-2 cursor-pointer"}>
        <div className={`w-[40px] h-[2px] bg-blue-400`} style={{backgroundColor: color(`${i}`)}}/>
        <span className={"text-sm font-medium text-gray-700"}>{d}</span>
      </div>)}
    </div>
  </div>
}
