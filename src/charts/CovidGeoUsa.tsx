import {extent, geoPath, interpolateRgb, scaleSequential, select} from "d3"
import {useEffect, useRef} from "react"
import * as topojson from "topojson-client"
import usaGeo from "./json/us-state.json"
import usaConfirmed from "./json/us_confirmed.json"

export const CovidGeoUsa = () => {
  const ref = useRef<HTMLDivElement>(null)

  const width  = 975,
        height = 610

  const color = scaleSequential()
    .interpolator(interpolateRgb("#f3f0f0", "#ec3761"))
    // @ts-ignore
    .domain(extent(usaConfirmed, i => +i.confirmed))

  useEffect(() => {
    // @ts-ignore
    const features = topojson.feature(usaGeo, usaGeo.objects.states).features
    // @ts-ignore
    const mesh = topojson.mesh(usaGeo, usaGeo.objects.states, (a, b) => a !== b)

    const svg = select(ref.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
    // .attr("transform", "translate(610,20)")

    const path = geoPath()

    svg.append("g")
      .selectAll("path")
      .data(features)
      .join("path")
      // @ts-ignore
      .attr("d", path)
      // @ts-ignore
      .attr("fill", d => color(+usaConfirmed.find(j => j.state === d.properties.name)?.confirmed || 0))

    svg.append("path")
      .datum(mesh)
      .attr("fill", "none")
      .attr("stroke", "white")
      .attr("stroke-width", 1.2)
      .attr("stroke-linejoin", "round")
      .attr("d", path)
  })

  return <div ref={ref}/>
}
