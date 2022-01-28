import {useAnimateOnce, useSvgSize, useUtc} from "@/hooks"
import data from "@/json/ml_future.json"
import {locale} from "@/libs"
import {AxisBottom, AxisLeft} from "@visx/axis"
import {Grid} from "@visx/grid"
import {format, line, scaleLinear, scaleOrdinal} from "d3"
import {motion} from "framer-motion"
import React from "react"

const legends = ["训练数据", "未来结果", "预测结果"]

export const CovidFuture = () => {
  const {ref, inView} = useAnimateOnce()

  const margin                = {left: 60, right: 30, top: 40, bottom: 40},
        {w, h, width, height} = useSvgSize(900, 500, margin)

  const x     = useUtc("2020-01-22", "2022-01-31", width),
        y     = scaleLinear()
          .domain([0, 360 * 1000 * 1000])
          .range([height, 0]),
        color = scaleOrdinal<string>()
          .range(["#ac70e5", "#ee553b", "#51f6c9"])

  return <div ref={ref} className={"relative"}>
    <svg width={w} height={h}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <AxisLeft
          scale={y}
          hideTicks
          hideZero
          tickFormat={format(".2s")}
          label={"确诊数"}
          labelOffset={40}
          labelProps={{fontSize: 13, textAnchor: "middle", fill: "#606162"}}
        />
        <AxisBottom scale={x} top={height} hideTicks tickFormat={locale.format("%Y年%b月")}/>
        <Grid width={width} height={height} xScale={x} yScale={y}/>
        {
          data.map((d, i) =>
            <motion.path
              key={i}
              d={line<{ x: string, y: number }>()
                .x(d => x(new Date(d.x)))
                .y(d => y(d.y))
                (d)
              }
              fill={"none"}
              stroke={color(`${i}`)}
              strokeWidth={2.5}
              strokeOpacity={0.7}
              className={"cursor-pointer"}
              animate={{
                strokeDasharray: ["0, 1400", inView ? "1400, 1400" : "0, 1400"],
                transition: {duration: 1.3, delay: i * 1.32 + 0.5}
              }}
              whileHover={{strokeWidth: 5, strokeOpacity: 1}}
            />)
        }
      </g>
    </svg>

    <div className={"absolute left-[100px] top-[25px] flex flex-col space-y-1 px-3 py-2.5 bg-gray-100 rounded-md"}>
      {legends.map((d, i) => <div key={d} className={"flex items-center space-x-2 cursor-pointer"}>
        <div className={`w-[50px] h-[2px] bg-blue-400`} style={{backgroundColor: color(`${i}`)}}/>
        <span className={"text-md font-medium text-gray-700"}>{d}</span>
      </div>)}
    </div>
  </div>
}