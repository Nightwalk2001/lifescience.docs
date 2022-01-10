import {useSvgSize} from "@/hooks"
import {axisBottom, axisLeft, extent, format, scaleLinear, scaleOrdinal, select} from "d3"
import {motion} from "framer-motion"
import React, {useEffect, useRef} from "react"
import data from "./json/population_density.json"

const continents = [
  "Asia",
  "Europe",
  "Africa",
  "North America",
  "South America",
  "Oceania",
  "Laos",
  "Timor-Leste",
  "Western Sahara"
]
const colors = [
  "#929afc",
  "#f48876",
  "#4ddbb6",
  "#c492fc",
  "#ffbd8c",
  "#5ee0f7",
  "#ffb6ff",
  "#929afc",
  "#f48876"
]

export const CovidScatterDensity = () => {
  const ref = useRef<SVGSVGElement>(null)

  const margin                = {left: 40, right: 170, top: 50, bottom: 40},
        {w, h, width, height} = useSvgSize(900, 500, margin)

  const x     = scaleLinear()
          .domain([0, 20 * 1000])
          .range([0, width]),
        y     = scaleLinear()
          .domain([0, 1600])
          .range([height, 0]),
        size  = scaleLinear().domain(extent(data.map(i => i.population))).range([5, 20]),
        color = scaleOrdinal<string>()
          .range(colors)

  useEffect(() => {
    const svg = select(ref.current).select("svg g")

    svg.select<SVGGElement>(".left")
      .call(axisLeft(y).tickSize(0).tickPadding(12))
      .call(g => g.selectAll(".tick line").clone()
        .attr("x2", width)
        .attr("stroke-opacity", 0.6))

    svg.select<SVGGElement>(".bottom")
      .call(axisBottom(x).tickSize(0).tickPadding(12).tickFormat(format(".2s")))
      .call(g => g.selectAll(".tick line").clone()
        .attr("y2", -height)
        .attr("stroke-opacity", 0.6))
  }, [])

  return <div className={"relative"}>
    <svg ref={ref} width={w} height={h}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <g className={"left"}/>
        <g className={"bottom"} transform={`translate(0, ${height})`}/>
        <g fill={"none"}>
          {data.map((d, i) => <motion.circle
            key={d.country}
            animate={{
              r: [0, size(d.population)],
              transition: {duration: 0.03, delay: i * 0.031}
            }}
            cx={x(d.confirmed)}
            cy={y(d.density)}
            fill={color(`${i}`)}
            opacity={0.6}
            stroke={"#fff"}
            strokeWidth={1}
            strokeOpacity={0.5}
          />)}
        </g>
      </g>
    </svg>

    <div className={"absolute right-0 top-[75px] flex flex-col space-y-1"}>
      {continents.map((d, i) => <div key={d} className={"flex items-center space-x-2"}>
        <div className={`w-[12px] h-[12px] rounded-full`} style={{backgroundColor: colors[i]}}/>
        <span className={"text-sm font-medium text-gray-700"}>{d}</span>
      </div>)}
    </div>
  </div>
}
