import {useSvgRoot, useSvgSize} from "@/hooks"
import {axisBottom, axisLeft, groups, max, min, scaleBand, scaleLinear, select} from "d3"
import React, {useEffect, useRef} from "react"
import ageDistribution from "./json/korea_age_distribution.json"

const data = groups(ageDistribution, i => i.age)
const legends = [{
  sex: "male",
  color: "#57d7ec"
}, {
  sex: "female",
  color: "#ec77c7"
}]

export const CovidAgeDistribution = () => {
  const ref = useRef<HTMLDivElement>(null)

  const margin                = {left: 40, right: 40, top: 50, bottom: 40},
        {w, h, width, height} = useSvgSize(900, 500, margin)

  const x = scaleBand()
          .domain(new Set(ageDistribution.map(i => i.age)))
          .range([0, width])
          .padding(0.15),
        y = scaleLinear()
          .domain([
            Math.min(
              min(data, i => i[1].filter(i => i.sex === "male").length),
              min(data, i => i[1].filter(i => i.sex === "female").length)
            ),
            Math.max(
              max(data, i => i[1].filter(i => i.sex === "male").length),
              max(data, i => i[1].filter(i => i.sex === "female").length)
            )
          ])
          .range([height, 0])

  useSvgRoot(ref, w, h, margin)

  useEffect(() => {
    const svg = select(ref.current).select("svg g")

    svg.append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", width)
      .attr("height", height)
      .attr("fill", "#eaeaf2")

    svg.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(axisBottom(x).tickSize(0).tickPadding(8))

    svg.append("g")
      .call(axisLeft(y).ticks(6).tickSize(0).tickPadding(6))
      .call(g => g.selectAll(".tick line").clone()
        .attr("x2", width)
        .attr("stroke", "#fff")
        .attr("stroke-width", 1.3)
        .attr("stroke-opacity", 0.8)
      )

    svg.selectAll(".domain").remove()

    const group = svg.selectAll(".group")
      .data(data)
      .join("g")
      .attr("stroke", "none")

    group.append("rect")
      .attr("x", d => x(d[0]))
      .attr("y", d => y(d[1].filter(i => i.sex === "male").length))
      .attr("width", x.bandwidth() / 2)
      .attr("height", d => height - y(d[1].filter(i => i.sex === "male").length))
      .attr("fill", "#57d7ec")
    group.append("rect")
      .attr("x", d => x(d[0]) + x.bandwidth() / 2)
      .attr("y", d => y(d[1].filter(i => i.sex === "female").length))
      .attr("width", x.bandwidth() / 2)
      .attr("height", d => height - y(d[1].filter(i => i.sex === "female").length))
      .attr("fill", "#ec77c7")
  }, [])

  return <div ref={ref} className={"relative"}>
    <div className={"absolute right-[80px] top-[75px] flex flex-col space-y-1 p-2 bg-gray-100 rounded-md"}>
      {
        legends.map(i => <div key={i.sex} className={"flex items-center space-x-2"}>
          <div className={`w-[20px] h-[20px] bg-blue-400`} style={{backgroundColor: i.color}}/>
          <span className={"text-sm font-medium text-gray-700"}>{i.sex}</span>
        </div>)
      }
    </div>
  </div>
}
