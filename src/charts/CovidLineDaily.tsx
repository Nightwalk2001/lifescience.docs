import {
  axisBottom,
  axisLeft,
  axisRight,
  curveNatural,
  extent,
  format,
  interpolate,
  line,
  scaleLinear,
  scaleUtc,
  select,
  timeFormatLocale
} from "d3"
import React, {useEffect, useRef} from "react"
import worldData from "./json/global_case.json"
import worldDataMean from "./json/global_case_mean.json"

type Data = {
  date: string
  confirmed: number
  fatalities: number
  dailyCases: number
  dailyDeaths: number
}

const dataReady = worldData.map(i => [
  [i.date, i.confirmed],
  [i.date, i.fatalities],
  [i.date, i.dailyCases],
  [i.date, i.dailyDeaths]
])

export const CovidLineDaily = () => {
  const ref = useRef<HTMLDivElement>(null)

  const w      = 800,
        h      = 500,
        margin = {left: 40, right: 40, top: 50, bottom: 40},
        width  = w - margin.left - margin.right,
        height = h - margin.top - margin.bottom

  const x      = scaleUtc()
          .domain([new Date("2020-01-22"), new Date("2021-05-29")])
          .range([0, width])
          .nice(),
        y      = scaleLinear()
          .domain(extent(worldData, i => i.dailyCases))
          .range([height, 0])
          .nice(),
        deathY = scaleLinear()
          .domain(extent(worldData, i => i.dailyDeaths))
          .range([height, 0])
          .nice()

  const legendsArray = [
    {name: "Daily Case", color: "#57d7ec"},
    {name: "Daily Case Mean/week", color: "#3591ee"},
    {name: "Daily Death", color: "#ea708d"},
    {name: "Daily Death Mean/week", color: "#ec3761"}
  ]

  const locale = timeFormatLocale({
    dateTime: "%a %b %e %X %Y",
    date: "%Y/%-m/%-d",
    time: "%H:%M:%S",
    periods: ["上午", "下午"],
    days: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
    shortDays: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
    months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
    shortMonths: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]
  })

  const dashTween = function () {
    const length = this.getTotalLength()
    return interpolate(`0,${length}`, `${length}, ${length}`)
  }

  useEffect(() => {
    const svg = select(ref.current)
      .append("svg")
      .attr("width", w)
      .attr("height", h)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`)

    svg.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(
        axisBottom(x)
          .ticks(8)
          .tickFormat(locale.format("%Y年%b月"))
      )

    svg.append("g")
      .call(axisLeft(y).tickFormat(format(".2s")))
      .call(g => g.selectAll(".tick line").clone()
        .attr("x2", width)
        .attr("stroke-opacity", 0.5))

    svg.append("g")
      .attr("transform", `translate(${width}, 0)`)
      .call(axisRight(deathY).tickFormat(format(".2s")))

    // svg.append("path")
    //   .datum(worldData.map(i => [i.date, i.confirmed]))
    //   .attr("d", d => line()
    //     .x(d => x(new Date(d[0])))
    //     // @ts-ignore
    //     .y(d => y(d[1]))(d))
    //   .attr("fill", "none")
    //   .attr("stroke", "red")
    //   .transition()
    //   .duration(14000)
    //   .attrTween("stroke-dasharray", dashTween)

    svg.append("path")
      .datum(worldData.map(i => [i.date, i.dailyCases]))
      .attr("d", d => line()
        .x(d => x(new Date(d[0])))
        // @ts-ignore
        .y(d => Math.abs(y(d[1]))).curve(curveNatural)(d))
      .attr("fill", "none")
      .attr("stroke", "#57d7ec")
      .attr("stroke-width", 0.6)
    // .transition()
    // .duration(9000)
    // .attrTween("stroke-dasharray", dashTween)

    svg.append("path")
      .datum(worldDataMean.map(i => [i.date, i.dailyCases]))
      .attr("d", d => line()
        .x(d => x(new Date(d[0])))
        // @ts-ignore
        .y(d => y(d[1])).curve(curveNatural)(d))
      .attr("fill", "none")
      .attr("stroke", "#3591ee")
      .attr("stroke-width", 2)

    svg.append("path")
      .datum(worldData.map(i => [i.date, i.dailyDeaths]))
      .attr("d", d => line()
        .x(d => x(new Date(d[0])))
        // @ts-ignore
        .y(d => Math.abs(deathY(d[1]))).curve(curveNatural)(d))
      .attr("fill", "none")
      .attr("stroke", "#ea708d")
      .attr("stroke-width", 0.6)

    svg.append("path")
      .datum(worldDataMean.map(i => [i.date, i.dailyDeaths]))
      .attr("d", d => line()
        .x(d => x(new Date(d[0])))
        // @ts-ignore
        .y(d => deathY(d[1])).curve(curveNatural)(d))
      .attr("fill", "none")
      .attr("stroke", "#ec3761")
      .attr("stroke-width", 2)

    svg.selectAll("text").style("color", "#525254")
  }, [])

  return <div ref={ref} className={"relative"}>
    <div className={"absolute left-[60px] top-[25px] flex flex-col space-y-3 p-2 bg-gray-100 rounded-md"}>
      {
        legendsArray.map(i => <div key={i.name} className={"flex items-center space-x-2"}>
          <div className={`w-[20px] h-[20px]`} style={{backgroundColor: i.color}}/>
          <span className={"text-sm font-medium text-gray-700"}>{i.name}</span>
        </div>)
      }
    </div>
  </div>
}
