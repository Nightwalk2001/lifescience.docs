import {extent, geoMercator, geoPath, interpolateRgb, scaleSequential, select} from "d3"
import {useEffect, useRef} from "react"
import indiaConfirmed from "./json/ind_confirmed.json"
import indiaGeo from "./json/ind_state.json"

export const CovidGeoIndia = () => {
  const ref = useRef<HTMLDivElement>(null)

  const width  = 575,
        height = 610

  const color = scaleSequential()
    .interpolator(interpolateRgb("#f3f0f0", "#9537ec"))
    // @ts-ignore
    .domain(extent(indiaConfirmed, i => +i.confirmed))

  useEffect(() => {
    const features = indiaGeo.features

    const svg = select(ref.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")

    const path = geoPath()
    // @ts-ignore
    const projection = geoMercator().fitSize([width, height], indiaGeo)

    svg.append("g")
      .selectAll("path")
      .data(features)
      .join("path")
      // @ts-ignore
      .attr("d", path.projection(projection))
      // @ts-ignore
      .attr("fill", d => color(+indiaConfirmed.find(j => j.state === d.properties.name)?.confirmed) || 0)
  })

  return <div ref={ref}/>
}
