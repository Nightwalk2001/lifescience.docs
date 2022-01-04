import {useChartColor1, useMinMax, useSvgRoot, useSvgSize, useUtc} from "@/hooks"
import {locale} from "@/libs"
import {axisBottom, axisLeft, curveNatural, format, line, select} from "d3"
import React, {useEffect, useRef} from "react"
import worldTrend from "./json/global_trend.json"

export const CovidLineTrend = () => {
  const ref = useRef<HTMLDivElement>(null)

  const margin                = {left: 40, right: 40, top: 50, bottom: 40},
        {w, h, width, height} = useSvgSize(800, 500, margin)

  const x     = useUtc("2020-01-22", "2021-05-29", width),
        y     = useMinMax(worldTrend[0].trend.map(i => i.cases), height),
        color = useChartColor1()

  const countries = ["US", "Brazil", "France", "Germany", "India", "Italy", "Russia", "UK", "Argentina", "Turkey"]

  useSvgRoot(ref, w, h, margin)

  useEffect(() => {
    // svg.append("rect")
    //   .attr("x", 0)
    //   .attr("y", 0)
    //   .attr("width", width)
    //   .attr("height", height)
    //   .attr("fill", "#eaeaf2")

    const svg = select(ref.current).select("svg g")

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

  return <div ref={ref} className={"relative"}>
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
