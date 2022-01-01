import {axisBottom, axisLeft, format, interpolate, line, max, scaleLinear, scaleUtc, select, timeFormatLocale} from "d3"
import {useEffect, useRef} from "react"
import worldData from "./json/global_case.json"

export const CovidLineWorld = () => {
  const ref = useRef<HTMLDivElement>(null)

  const w      = 700,
        h      = 480,
        margin = {left: 40, right: 10, top: 30, bottom: 40},
        width  = w - margin.left - margin.right,
        height = h - margin.top - margin.bottom

  const x = scaleUtc()
          .domain([new Date("2020-01-22"), new Date("2021-05-29")])
          .range([0, width])
          .nice(),
        y = scaleLinear()
          .domain([0, max(worldData, i => i.confirmed) as number])
          .range([height, 0])
          .nice()

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

    svg.append("path")
      .datum(worldData.map(i => [i.date, i.confirmed]))
      .attr("d", d => line()
        .x(d => x(new Date(d[0])))
        // @ts-ignore
        .y(d => y(d[1]))(d))
      .attr("fill", "none")
      .attr("stroke", "red")
      .transition()
      .duration(14000)
      .attrTween("stroke-dasharray", dashTween)
  }, [])

  return <div ref={ref}/>
}