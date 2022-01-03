import {locale} from "@/libs"
import {axisBottom, axisLeft, curveNatural, extent, format, line, scaleLinear, scaleOrdinal, scaleUtc, select} from "d3"
import React, {useEffect, useRef} from "react"
import worldTrend from "./json/global_trend.json"

export const CovidLineTrend = () => {
  const divRef = useRef<HTMLDivElement>(null)

  const w      = 800,
        h      = 500,
        margin = {left: 40, right: 40, top: 50, bottom: 40},
        width  = w - margin.left - margin.right,
        height = h - margin.top - margin.bottom

  const x     = scaleUtc()
          .domain([new Date("2020-01-22"), new Date("2021-05-29")])
          .range([0, width])
          .nice(),
        y     = scaleLinear()
          .domain(extent(worldTrend[0].trend.map(i => i.cases)))
          .range([height, 0])
          .nice(),
        color = scaleOrdinal()
          .range([
            "#636efa", "#ee553b", "#00cb95", "#aa63f9",
            "#fda059", "#19d1f1", "#fe6691", "#b5e77f",
            "#ff97ff", "#fecb52"
          ])

  const countries = ["US", "Brazil", "France", "Germany", "India", "Italy", "Russia", "UK", "Argentina", "Turkey"]

  useEffect(() => {
    const svg = select(divRef.current)
      .append("svg")
      .attr("width", w)
      .attr("height", h)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`)

    // svg.append("rect")
    //   .attr("x", 0)
    //   .attr("y", 0)
    //   .attr("width", width)
    //   .attr("height", height)
    //   .attr("fill", "#eaeaf2")

    svg.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(axisBottom(x)
        .ticks(8)
        .tickFormat(locale.format("%Y年%b月")))

    svg.append("g")
      .call(axisLeft(y).tickFormat(format(".2s")))
      .call(g => g.selectAll(".tick line").clone()
        .attr("x2", width)
        .attr("stroke-opacity", 0.4))

    svg.selectAll(".line")
      .data(worldTrend)
      .join("path")
      // @ts-ignore
      .attr("d", d => line().x(d => x(new Date(d.date))).y(d => y(d.cases)).curve(curveNatural)(d.trend))
      .attr("fill", "none")
      // @ts-ignore
      .attr("stroke", (_, i) => color(i))
      .attr("stroke-width", 2.2)
  }, [])

  return <div ref={divRef} className={"relative"}>
    <div className={"absolute left-[60px] top-[25px] flex flex-col space-y-1 p-2 bg-gray-100 rounded-md"}>
      {
        countries.map((i, index) => <div key={i} className={"flex items-center space-x-2"}>
          <div
            className={`w-[40px] h-[2px] bg-blue-400`}
            // @ts-ignore
            style={{backgroundColor: color(index)}}
          />
          <span className={"text-sm font-medium text-gray-700"}>{i}</span>
        </div>)
      }
    </div>
  </div>
}
