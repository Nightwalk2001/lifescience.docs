import {useMinMax, useSvgSize, useUtc} from "@/hooks"
import {locale} from "@/libs"
import {axisBottom, axisLeft, curveNatural, format, line, scaleOrdinal, select} from "d3"
import {motion} from "framer-motion"
import React, {useEffect, useRef} from "react"
import data from "./json/global_trend.json"

const countries = ["US", "Brazil", "France", "Germany", "India", "Italy", "Russia", "UK", "Argentina", "Turkey"]

export const CovidLineTrend = () => {
  const ref = useRef<SVGSVGElement>(null)

  const margin                = {left: 40, right: 40, top: 50, bottom: 40},
        {w, h, width, height} = useSvgSize(800, 500, margin)

  const x     = useUtc("2020-01-22", "2021-05-29", width),
        y     = useMinMax(data[0].trend.map(i => i.cases), height),
        color = scaleOrdinal<string>()
          .range([
            "#636efa", "#ee553b", "#00cb95", "#aa63f9",
            "#fda059", "#19d1f1", "#fe6691", "#b5e77f",
            "#ff97ff", "#fecb52"
          ])

  useEffect(() => {
    const svg = select(ref.current)

    svg.select<SVGGElement>(".left")
      .call(axisLeft(y).tickFormat(format(".2s")))
      .call(g => g.selectAll(".tick line").clone()
        .attr("x2", width)
        .attr("stroke-opacity", 0.4))

    svg.select<SVGGElement>(".bottom")
      .call(axisBottom(x)
        .ticks(8)
        .tickFormat(locale.format("%Y年%b月")))
  }, [])

  return <div className={"relative"}>
    <svg ref={ref} width={w} height={h}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <g className={"left"}/>
        <g className={"bottom"} transform={`translate(0, ${height})`}/>
        <g fill={"none"}>
          {data.map((d, i) => <motion.path
            key={d.country}
            animate={{
              strokeDasharray: ["0, 1400", "1400, 1400"],
              transition: {duration: 1, delay: i * 1.02}
            }}
            d={line<{ date: string, cases: number }>()
              .x(p => x(new Date(p.date)))
              .y(p => y(p.cases))
              .curve(curveNatural)
              (d.trend)
            }
            stroke={color(`${i}`)}
            strokeWidth={2}
          />)}
        </g>
      </g>
    </svg>

    <div className={"absolute left-[60px] top-[25px] flex flex-col space-y-1 p-2 bg-gray-100 rounded-md"}>
      {countries.map((d, i) => <div key={d} className={"flex items-center space-x-2"}>
        <div className={`w-[40px] h-[2px] bg-blue-400`} style={{backgroundColor: color(`${i}`)}}/>
        <span className={"text-sm font-medium text-gray-700"}>{d}</span>
      </div>)}
    </div>
  </div>
}
