import {useSvgSize} from "@/hooks"
import {locale} from "@/libs"
import {axisBottom, axisLeft, axisRight, format, line, scaleLinear, scaleOrdinal, scaleTime, select} from "d3"
import {motion} from "framer-motion"
import React, {useEffect, useRef, useState} from "react"
import fansData from "../json/fans.json"

const legends = ["fans", "like"]
const points = [400, 520, 1000, 1307, 1502, 2004]

export const FansChart = () => {
  const ref = useRef<SVGGElement>(null)

  const [index, setIndex] = useState<number>(0)

  const margin                = {left: 50, right: 50, top: 50, bottom: 40},
        {w, h, width, height} = useSvgSize(1000, 550, margin)

  const x     = scaleTime()
          .domain([
            new Date("2022-01-02T23:48:00"),
            new Date("2022-01-10T00:00:00")
          ])
          .range([0, width])
          .nice(),
        fansY = scaleLinear()
          .domain([0, 2240])
          .range([height, 0])
          .nice(),
        likeY = scaleLinear()
          .domain([0, 8770])
          .range([height, 0])
          .nice(),
        color = scaleOrdinal<string>()
          .range(["#ec3761", "#3eeed3"])

  useEffect(() => {
    const interval = setInterval(() => index < fansData.length - 1
      ? setIndex(index + 1)
      : clearInterval(interval), 110)

    return () => clearInterval(interval)
  })

  useEffect(() => {
    const svg = select(ref.current)

    svg.select<SVGGElement>(".left")
      .call(axisLeft(fansY).tickSize(0).tickPadding(9).tickFormat(format(".2s")))
      .call(g => g.selectAll(".tick line").clone()
        .attr("x2", width)
        .attr("stroke", "#fff")
        .attr("stroke-width", 1.3)
      )
    svg.select<SVGGElement>(".right")
      .call(axisRight(likeY).tickSize(0).tickPadding(9).tickFormat(format(".2s")))
    svg.select<SVGGElement>(".bottom")
      .call(axisBottom(x).ticks(11).tickSize(5).tickPadding(15).tickFormat(locale.format("%d日%p")))
      .selectAll("text")
      .attr("transform", "rotate(-24)")

    svg.selectAll(".bottom .tick line").attr("stroke", "#cdcfd0")
    svg.selectAll(".domain").attr("stroke", "#cdcfd0")
    svg.selectAll("text").style("font-size", 13)
      .style("color", "#606162")
  }, [])

  return <div className={"relative"}>
    <svg width={w} height={h}>
      <g ref={ref} transform={`translate(${margin.left}, ${margin.top})`}>
        <rect x={0} y={0} width={width} height={height} fill={"#f9f9fd"}/>
        <g className={"left"}/>
        <g className={"right"} transform={`translate(${width}, 0)`}/>
        <g className={"bottom"} transform={`translate(0, ${height})`}/>
        <motion.path
          animate={{
            strokeDasharray: ["0,1000", "1000,1000"],
            transition: {duration: 4}
          }}
          d={line<typeof fansData[0]>()
            .x(d => x(new Date(`2022-01-0${d.date}T${d.time}:00`)))
            .y(d => fansY(d.fans))
            (fansData)}
          fill={"none"}
          stroke={"#ea708d"}
          strokeWidth={3}
        />
        <motion.path
          animate={{
            strokeDasharray: ["0,1000", "1000,1000"],
            transition: {duration: 4}
          }}
          d={line<typeof fansData[0]>()
            .x(d => x(new Date(`2022-01-0${d.date}T${d.time}:00`)))
            .y(d => likeY(d.like))
            (fansData)}
          fill={"none"}
          stroke={"#3eeed3"}
          strokeWidth={3}
        />
        {fansData.map((d, i) => points.includes(d.fans) && <React.Fragment key={d.fans}>
          <motion.circle
            animate={{
              r: [0, 6],
              transition: {duration: 0.1, delay: i * 0.105 + 2.5}
            }}
            cx={x(new Date(
              `2022-01-0${d.date}T${d.time}:00`))}
            cy={fansY(d.fans)}
            r={4}
            fill={"#ea708d"}
            stroke={"#fff"}
            strokeWidth={0.2}
            opacity={0.8}
          />
          <motion.path
            animate={{
              d: `
              M${x(new Date(`2022-01-0${d.date}T${d.time}:00`))},${height} 
              L${x(new Date(`2022-01-0${d.date}T${d.time}:00`))},${fansY(d.fans)}
              L0,${fansY(d.fans)}
              `,
              opacity: [0, 1],
              transition: {delay: i * 0.105 + 2.5}
            }}
            stroke={"#606162"}
            fill={"none"}
            strokeDasharray={"3 2"}/>
          <motion.text
            animate={{
              opacity: [0, 1],
              transition: {delay: i * 0.105 + 2.5}
            }}
            x={x(new Date(`2022-01-0${d.date}T${d.time}:00`))}
            y={i === 17 ? height - 40 : height - 10}
            textAnchor={"middle"}
          >
            {d.date}号{d.time}
          </motion.text>

          <motion.text
            animate={{
              opacity: [0, 1],
              transition: {delay: i * 0.105 + 2.5}
            }}
            x={10}
            y={fansY(d.fans) - 3}>
            {d.fans}
          </motion.text>
        </React.Fragment>)}
      </g>
    </svg>

    <div className={`absolute left-[120px] top-[40px]
     pl-3 pr-6 py-2 text-gray-600 bg-gray-100 rounded-md`}>
      {legends.map((d, index) =>
        <div key={d} className={"flex items-center space-x-2"}>
          <div
            className={`w-[50px] h-[2px]`}
            style={{backgroundColor: color(`${index}`)}}
          />
          <span className={"text-sm font-semibold text-gray-600"}>{d === "fans" ? "粉丝数" : "点赞数"}</span>
        </div>)}
      <div className={"mt-3 text-sm"}>
        <strong>时间：</strong>{fansData[index].date}号{fansData[index].time} <br/>
        <strong>粉丝数：</strong>{fansData[index].fans} <br/>
        <strong>点赞数：</strong>{fansData[index].like}
      </div>
    </div>
  </div>
}
