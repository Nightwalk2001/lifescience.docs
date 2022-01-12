import {useSvgSize} from "@/hooks"
import {axisBottom, axisLeft, extent, scaleBand, scaleLinear, scaleOrdinal, select} from "d3"
import React, {useEffect, useRef} from "react"
import data from "./band.json"

const groups = [
  "Biological Processes",
  "Cellular Components",
  "Molecular Functions"
]

const g = ["生物过程", "细胞成分", "分子功能"]

export const GeneBand = () => {

  const ref = useRef<SVGGElement>(null)
  const margin                = {left: 50, right: 50, top: 20, bottom: 100},
        {w, h, width, height} = useSvgSize(1000, 650, margin)

  const x     = scaleBand()
          .domain(data.map(i => i.cn))
          .range([0, width])
          .padding(0.1),
        y     = scaleLinear()
          .domain(extent(data, i => +i.percentage))
          .range([height, 0])
          .nice(),
        color = scaleOrdinal<string>()
          .domain(g)
          .range(["#ea708d", "#abfda9", "#57d7ec"])

  useEffect(() => {
    const svg = select(ref.current)

    svg.select<SVGGElement>(".left")
      .call(axisLeft(y).tickSize(0).tickPadding(9))
      .call(g => g.selectAll(".tick line").clone()
        .attr("x2", width)
        .attr("stroke", "#dee1e1")
        .attr("stroke-width", 1.3)
      )
    svg.select<SVGGElement>(".bottom")
      .call(axisBottom(x).ticks(11).tickSize(0).tickPadding(15))
      .selectAll("text")
      .style("font-size", 11)
      .attr("text-anchor", "end")
      .attr("transform", "translate(-12,0) rotate(-78)")

    svg.select(".left .domain")
      .attr("stroke", "#fff")

    svg.selectAll(".left .tick text")
      .style("font-size", 12)
      .style("color", "#a8a9a9")
  }, [])

  return <div className={"relative"}>
    <svg width={w} height={h}>
      <g ref={ref} transform={`translate(${margin.left}, ${margin.top})`}>
        {/*<rect x={0} y={0} width={width} height={height} fill={"#fafafa"}/>*/}
        <g className={"left"}/>
        <g className={"bottom"} transform={`translate(0, ${height})`}/>
        <g>
          {data.map(d => <rect
            key={d.cn}
            x={x(d.cn)}
            y={y(+d.percentage)}
            width={x.bandwidth()}
            height={height - y(+d.percentage)}
            fill={color(d.group)}
          />)}
        </g>
      </g>
    </svg>

    {/*<div className={"absolute left-[380px] top-0 text-gray-800 font-semibold"}>*/}
    {/*  Top20 of pathway enrichment*/}
    {/*</div>*/}
    <div className={"absolute -left-12 top-1/3 -rotate-90 text-gray-600 font-medium"}>
      基因百分比/%
    </div>

    <div className={"absolute left-24 top-3  flex flex-col space-y-1 px-3 py-2.5 bg-gray-100 rounded-md"}>
      {g.map(d => <div
        key={d}
        className={"flex items-center space-x-3"}>
        <div className={`w-[30px] h-[30px]`} style={{backgroundColor: color(d)}}/>
        <span>{d}</span>
      </div>)}
    </div>
  </div>
}
