import {useSvgSize} from "@/hooks"
import {axisBottom, axisLeft, extent, interpolateRgb, scaleBand, scaleLinear, scaleSequential, select} from "d3"
import React, {useEffect, useRef} from "react"
import data from "../json/gene.json"

const gene = data.reverse()

export const GeneChart = () => {
  const ref = useRef<SVGGElement>(null)
  const margin                = {left: 160, right: 120, top: 50, bottom: 60},
        {w, h, width, height} = useSvgSize(800, 590, margin)

  const x       = scaleLinear()
          .domain(extent(gene.map(i => i.richness)))
          .range([0, width])
          .nice(),
        pathway = scaleBand()
          .domain(gene.map(i => i.cn))
          .range([height, 0])
          .round(true),
        size    = scaleLinear()
          .domain(extent(gene.map(i => i.count)))
          .range([1.7, 12]),
        color   = scaleSequential<string>()
          .domain(extent(gene.map(i => i.log10p)))
          .interpolator(interpolateRgb("#1dec60", "#ec3761"))

  useEffect(() => {
    const svg = select(ref.current)

    svg.select<SVGGElement>(".left")
      .call(axisLeft(pathway).tickSize(0).tickPadding(9))
      .call(g => g.selectAll(".tick line").clone()
        .attr("x2", width)
        .attr("stroke", "#cfcfcf")
        .attr("stroke-width", 1)
      )

    svg.select<SVGGElement>(".bottom")
      .call(axisBottom(x).ticks(11).tickSize(0).tickPadding(8))
      .call(g => g.selectAll(".tick line").clone()
        .attr("y2", -height)
        .attr("stroke", "#cfcfcf")
        .attr("stroke-width", 1)
      )

    svg.selectAll(".bottom .domain").attr("stroke", "#cdcfd0")
    svg.selectAll(".left .domain").attr("stroke", "#cdcfd0")
  }, [])

  return <div className={"relative"}>
    <svg width={w} height={h}>
      <g ref={ref} transform={`translate(${margin.left}, ${margin.top})`}>
        <g className={"left"}/>
        <g className={"bottom"} transform={`translate(0, ${height})`}/>
        {gene.map(d => <circle
          key={d.cn}
          cx={x(d.richness)}
          cy={pathway(d.cn) + pathway.bandwidth() / 2}
          r={size(d.count)}
          fill={color(d.log10p)}
        />)}
      </g>
    </svg>

    <div className={"absolute left-[355px] top-0 text-gray-800 font-semibold"}>
      富集通路的前20条
    </div>
    <div className={"absolute -left-12 top-1/2 -translate-y-1/2 -rotate-90 text-gray-800"}>
      通路名称
    </div>
    <div className={"absolute left-[405px] bottom-2 text-gray-800"}>
      丰度
    </div>

    <div className={"absolute right-[20px] top-1/2 -translate-y-1/2 text-gray-800 text-xs"}>
      <div>
        <span className={"ml-2"}>基因数目</span>
        <div className={"flex flex-col items-center mt-2"}>
          {[20, 40, 60].map(d => <div key={d} className={"flex justify-around items-center w-full"}>
            <div
              className={"rounded-full bg-red-400"}
              style={{width: size(d) * 2, height: size(d) * 2}}/>
            <span>{d}</span>
          </div>)}
        </div>
      </div>

      <div className={"flex flex-col items-center mt-5"}>
        <span>log10(Pvalue)</span>
        <div className={"flex items-center space-x-1.5 mt-2"}>
          <div className={"bg-gradient-to-t from-[#1dec60] to-[#ec3761] w-[30px] h-[180px]"}/>
          <div className={"flex flex-col justify-between h-[180px]"}>
            <span>-10</span>
            <span>-80</span>
          </div>
        </div>
      </div>
    </div>
  </div>
}