import {useSvgRoot, useSvgSize} from "@/hooks"
import {axisBottom, axisLeft, curveNatural, groups, line, scaleBand, scaleLinear, select} from "d3"
import React, {useEffect, useRef} from "react"
import demo from "./json/demo.json"

const data = groups(demo, i => i.count)

const norm = (x: number, miu: number, sigma: number) => Math.exp(-((x - miu) ** 2 / (2 * sigma ** 2))) / ((2 * Math.PI) ** 0.5 * sigma)

const males = 418
const females = 516

const miu1 = 30.25
const sigma1 = 4.365

const miu2 = 36.02
const sigma2 = 4.248

const legends = [{
  sex: "male",
  color: "#57d7ec",
  mu: 30.25,
  sigma: 4.365
}, {
  sex: "female",
  color: "#ec77c7",
  mu: 36.02,
  sigma: 4.248
}]

export const GeneticsDistribution = () => {
  const ref = useRef<HTMLDivElement>(null)

  const margin                = {left: 40, right: 40, top: 50, bottom: 40},
        {w, h, width, height} = useSvgSize(900, 500, margin)

  const x     = scaleBand()
          .domain(new Set(demo.map(i => i.count)))
          .range([0, width])
          .padding(0.05),
        y     = scaleLinear()
          .domain([0, 0.12])
          .range([height, 0])
          .nice(),
        normX = scaleLinear()
          .domain([14, 50])
          .range([0, width])

  const norm1 = line()
    // @ts-ignore
    .x(d => normX(d))
    // @ts-ignore
    .y(d => y(norm(d, miu1, sigma1)))
    .curve(curveNatural)

  const norm2 = line()
    // @ts-ignore
    .x(d => normX(d))
    // @ts-ignore
    .y(d => y(norm(d, miu2, sigma2)))
    .curve(curveNatural)

  useSvgRoot(ref, w, h, margin)

  useEffect(() => {
    const svg = select(ref.current).select("svg g")

    svg.append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", width)
      .attr("height", height)
      .attr("fill", "#f9f9fd")

    svg.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(axisBottom(x).tickSize(0).tickPadding(9))

    svg.append("g")
      .call(axisLeft(y).ticks(6).tickSize(0).tickPadding(9))
      .call(g => g.selectAll(".tick line").clone()
        .attr("x2", width)
        .attr("stroke", "#fff")
        .attr("stroke-width", 1.3)
      )

    svg.selectAll(".domain").remove()

    const countGroup = svg.selectAll("group")
      .data(data)
      .join("g")
      .attr("stroke", "none")
      .attr("opacity", 0.7)

    countGroup.append("rect")
      .attr("x", d => x(d[0]))
      .attr("y", d => y(d[1].filter(i => i.sex === "male").length / 418 / 4))
      .attr("width", x.bandwidth() / 2)
      .attr("height", d => height - y(d[1].filter(i => i.sex === "male").length / 418 / 4))
      .attr("fill", "#57d7ec")

    countGroup.append("rect")
      .attr("x", d => x(d[0]) + x.bandwidth() / 2)
      .attr("y", d => y(d[1].filter(i => i.sex === "female").length / 516 / 4))
      .attr("width", x.bandwidth() / 2)
      .attr("height", d => height - y(d[1].filter(i => i.sex === "female").length / 516 / 4))
      .attr("fill", "#ec77c7")

    svg.append("path")
      // .attr("transform", `translate(0, ${height})`)
      // @ts-ignore
      .attr("d", norm1(normX.ticks(90)))
      .attr("fill", "none")
      .attr("stroke", "#57d7ec")
      .attr("stroke-width", 3)

    svg.append("path")
      // .attr("transform", `translate(0, ${height})`)
      // @ts-ignore
      .attr("d", norm2(normX.ticks(90)))
      .attr("fill", "none")
      .attr("stroke", "#ec77c7")
      .attr("stroke-width", 3)

    svg.selectAll("text").style("font-size", 14)
  }, [])

  return <div ref={ref} className={"relative"}>
    <div className={"absolute right-[80px] top-[75px] flex flex-col space-y-1 px-2 py-1.5 bg-gray-100 rounded-md"}>
      {
        legends.map(i => <div key={i.sex} className={"flex items-center space-x-3"}>
          <div className={`w-[30px] h-[30px] bg-blue-400`} style={{backgroundColor: i.color}}/>
          <span className={"text-sm font-medium text-gray-700"}>{i.sex} <br/> <span
            className={"font-mono mr-1"}>μ={i.mu}</span> <span className={"font-mono"}>σ={i.sigma}</span></span>
        </div>)
      }
    </div>
  </div>
}
