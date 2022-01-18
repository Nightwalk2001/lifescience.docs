import {useSvgSize} from "@/hooks"
import {locale} from "@/libs"
import {AxisBottom, AxisLeft} from "@visx/axis"
import {Grid} from "@visx/grid"
import {extent, format, scaleLinear, scaleOrdinal} from "d3"
import {motion} from "framer-motion"
import React from "react"
import {useInView} from "react-intersection-observer"
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
  const {ref, inView} = useInView({triggerOnce: true})

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

  return <div ref={ref} className={"relative"}>
    <svg width={w} height={h}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <AxisLeft scale={y} hideTicks hideZero tickFormat={format(".2s")}/>
        <AxisBottom scale={x} top={height} hideTicks tickFormat={locale.format("%Y年%b月")} numTicks={8}/>
        <Grid width={width} height={height} xScale={x} yScale={y}/>
        <g fill={"none"}>
          {data.map((d, i) => <motion.circle
            key={d.country}
            cx={x(d.confirmed)}
            cy={y(d.density)}
            fill={color(`${i}`)}
            opacity={0.6}
            stroke={"#fff"}
            strokeWidth={1}
            strokeOpacity={0.5}
            className={"cursor-pointer"}
            animate={{
              r: [0, inView ? size(d.population) : 0],
              transition: {duration: 0.03, delay: i * 0.031 + 0.5}
            }}
            whileHover={{opacity: 1, scale: 1.1}}
          />)}
        </g>
      </g>
    </svg>

    <div className={"absolute right-0 top-[75px] flex flex-col space-y-1"}>
      {continents.map((d, i) => <div key={d} className={"flex items-center space-x-2 cursor-pointer"}>
        <div className={`w-[12px] h-[12px] rounded-full`} style={{backgroundColor: colors[i]}}/>
        <span className={"text-sm font-medium text-gray-700"}>{d}</span>
      </div>)}
    </div>
  </div>
}
