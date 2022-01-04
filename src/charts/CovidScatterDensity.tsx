import {useSvgRoot, useSvgSize} from "@/hooks"
import {axisBottom, axisLeft, extent, format, scaleLinear, scaleOrdinal, select} from "d3"
import React, {useEffect, useRef} from "react"
import populationDensity from "./json/population_density.json"

const continents = [
  "Asia",
  "Europe",
  "Africa",
  "North America",
  "South America",
  "Oceania",
  "Laos",
  "Timor-Leste",
  "Western Sahara"
]
const colors = [
  "#929afc",
  "#f48876",
  "#4ddbb6",
  "#c492fc",
  "#ffbd8c",
  "#5ee0f7",
  "#ffb6ff",
  "#929afc",
  "#f48876"
]

export const CovidScatterDensity = () => {
  const ref = useRef<HTMLDivElement>(null)

  const margin                = {left: 40, right: 170, top: 50, bottom: 40},
        {w, h, width, height} = useSvgSize(900, 500, margin)

  const x     = scaleLinear()
          .domain([0, 20 * 1000])
          .range([0, width]),
        y     = scaleLinear()
          .domain([0, 1600])
          .range([height, 0]),
        size  = scaleLinear().domain(extent(populationDensity.map(i => i.population))).range([5, 20]),
        color = scaleOrdinal()
          .domain(continents)
          .range(colors)

  useSvgRoot(ref, w, h, margin)

  useEffect(() => {
    const svg = select(ref.current).select("svg g")

    // svg.append("rect")
    //   .attr("x", 0)
    //   .attr("y", 0)
    //   .attr("width", width)
    //   .attr("height", height)
    //   .attr("fill", "#eaeaf2")

    svg.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(axisBottom(x).tickSize(0).tickPadding(12).tickFormat(format(".2s")))
      .call(g => g.selectAll(".tick line").clone()
        .attr("y2", -height)
        .attr("stroke-opacity", 0.6))

    svg.append("g")
      .call(axisLeft(y).tickSize(0).tickPadding(12))
      .call(g => g.selectAll(".tick line").clone()
        .attr("x2", width)
        .attr("stroke-opacity", 0.6))

    svg.selectAll(".point")
      .data(populationDensity)
      .join("circle")
      .attr("cx", d => x(d.confirmed))
      .attr("cy", d => y(d.density))
      .attr("r", d => size(d.population))
      .attr("fill", d => color(d.continent) as string)
      .attr("opacity", 0.6)
      .attr("stroke", "#fff")
      .attr("stroke-width", 1)
      .attr("stroke-opacity", 0.5)
  }, [])

  return <div ref={ref} className={"relative"}>
    <div className={"absolute right-0 top-[75px] flex flex-col space-y-1"}>
      {
        continents.map((i, index) => <div key={i} className={"flex items-center space-x-2"}>
          <div
            className={`w-[12px] h-[12px] rounded-full`}
            style={{backgroundColor: colors[index]}}
          />
          <span className={"text-sm font-medium text-gray-700"}>{i}</span>
        </div>)
      }
    </div>
  </div>
}
