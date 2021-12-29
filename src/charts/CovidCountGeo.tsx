import {flatGroup, hierarchy, scaleLinear, scaleOrdinal, select, sum, treemap} from "d3"
import {useEffect, useRef} from "react"
import TestData from "./json/demo.json"
import TreeData from "./json/universe_covid19.json"

type TreemapData = {
  country: string
  confirmed: number
  fatalities: number
  recovered: number
  continent: string
}

const data = flatGroup((TreeData as TreemapData[]), i => i.country)
  .map(i => ({
    country: i[0],
    confirmed: sum(i[1], i => i.confirmed),
    continent: i[1][0].continent
  }))
  .filter(i => i.confirmed > 1000000)

const children = flatGroup(
  data.map(i => ({
    country: i.country,
    confirmed: i.confirmed,
    continent: i.continent
  })),
  i => i.continent
)
  .map(i => ({
    name: i[0],
    children: i[1].map(i => ({name: i.country, confirmed: i.confirmed})),
    confirmed: sum(i[1], i => i.confirmed)
  }))

const universe = {
  name: "world",
  children: children,
  confirmed: 0
}

export const CovidCountGeo = () => {
  const ref = useRef<HTMLDivElement>(null)

  const w      = 1000,
        h      = 885,
        margin = {top: 10, right: 10, bottom: 10, left: 10},
        width  = w - margin.left - margin.right,
        height = h - margin.top - margin.bottom

  const color = scaleOrdinal()
    .range(["#3eeed3", "#ea708d", "#ec77c7", "#49eeaf",
      "#ab48f8"])

  const opacity = scaleLinear()
    .domain([10, 30])
    .range([.5, 1])

  useEffect(() => {
    const svg = select(ref.current)
      .append("svg")
      .attr("width", w)
      .attr("height", h)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`)

    // @ts-ignore
    const root = hierarchy(TestData, d => d.children).sum(i => i.confirmed).sort((a, b) => b.confirmed - a.confirmed)
    const rootWithPosition = treemap()
      .size([width, height])
      (root)

    svg.selectAll("rect")
      .data(rootWithPosition)
      .join("rect")
      .attr("x", d => d.x0)
      .attr("y", d => d.y0)
      .attr("width", d => d.x1 - d.x0)
      .attr("height", d => d.y1 - d.y0)
      .style("stroke", "#ec77c7")
      // @ts-ignore
      .style("fill", d => color((d?.parent?.name)) as string ? color((d.parent.name)) as string : "#123456")

    svg.selectAll("text")
      .data(rootWithPosition.leaves().filter(i => i.depth !== 1))
      .join("text")
      .attr("x", d => d.x0 + 5)
      .attr("y", d => d.y0 + 20)
      // @ts-ignore
      .text(d => d.data.name)
      .attr("font-size", "11px")
      .attr("fill", "white")

    // svg.selectAll("titles")
    //   .data(new Set(rootWithPosition.leaves().map(i => i.parent).filter(i => i?.depth === 1)))
    //   .join("text")
    //   .attr("x", d => d!.parent!.x0)
    //   .attr("y", d => d!.parent!.y0 + 21)
    //   // @ts-ignore
    //   .text(d => d.data.name)
    //   .attr("font-size", "29px")

  }, [])

  return <div ref={ref}/>
}
