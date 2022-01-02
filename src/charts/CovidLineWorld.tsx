import {
  axisBottom,
  axisLeft,
  curveNatural,
  format,
  interpolate,
  line,
  mean,
  scaleLinear,
  scaleUtc,
  select,
  timeFormatLocale
} from "d3"
import {useEffect, useRef} from "react"
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

export const CovidLineWorld = () => {
  const ref = useRef<HTMLDivElement>(null)

  const w      = 700,
        h      = 480,
        margin = {left: 40, right: 10, top: 30, bottom: 40},
        width  = w - margin.left - margin.right,
        height = h - margin.top - margin.bottom

  const x      = scaleUtc()
          .domain([new Date("2020-01-22"), new Date("2021-05-29")])
          .range([0, width])
          .nice(),
        y      = scaleLinear()
          .domain([0, 1500 * 1000])
          .range([height, 0])
          .nice(),
        deathY = scaleLinear()
          .domain([0, 20 * 1000])
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
    const result: { date: string, dailyCases: number, dailyDeaths: number }[] = []
    let tmp: Data[] = []
    worldData.forEach((v, i, arr) => {
      if ((i + 1) % 7 !== 0 && i !== arr.length - 1) tmp.push(v)
      else {
        result.push({
          date: tmp[Math.round((tmp.length - 1) / 2) - 1].date,
          dailyCases: Math.round(mean(tmp, i => i.dailyCases)),
          dailyDeaths: Math.round(mean(tmp, i => i.dailyDeaths))
        })
        tmp = []
      }
    })
    console.log(result)
    console.log(worldData.length)
    console.log(result.length)
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
        .y(d => y(d[1]))(d))
      .attr("fill", "none")
      .attr("stroke", "#57d7ec")
      .attr("stroke-width", 1.6)
    // .transition()
    // .duration(9000)
    // .attrTween("stroke-dasharray", dashTween)

    svg.append("path")
      .datum(worldDataMean.map(i => [i.date, i.dailyCases]))
      .attr("d", d => line()
        .x(d => x(new Date(d[0])))
        // @ts-ignore
        .y(d => y(d[1]))(d))
      .attr("fill", "none")
      .attr("stroke", "#3591ee")
      .attr("stroke-width", 1.6)

    svg.append("path")
      .datum(worldData.map(i => [i.date, i.dailyDeaths]))
      .attr("d", d => line()
        .x(d => x(new Date(d[0])))
        // @ts-ignore
        .y(d => deathY(d[1])).curve(curveNatural)(d))
      .attr("fill", "none")
      .attr("stroke", "#ea708d")
      .attr("stroke-width", 1.35)

    svg.append("path")
      .datum(worldDataMean.map(i => [i.date, i.dailyDeaths]))
      .attr("d", d => line()
        .x(d => x(new Date(d[0])))
        // @ts-ignore
        .y(d => deathY(d[1])).curve(curveNatural)(d))
      .attr("fill", "none")
      .attr("stroke", "#ec3761")
      .attr("stroke-width", 1.35)
    // .transition()
    // .duration(9000)
    // .delay(10000)
    // .attrTween("stroke-dasharray", dashTween)

  }, [])

  return <div ref={ref}/>
}
