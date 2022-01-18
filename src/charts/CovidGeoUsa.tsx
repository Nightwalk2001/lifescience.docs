import {extent, format, geoPath, interpolateRgb, pointer, scaleSequential, select} from "d3"
import {motion} from "framer-motion"
import {useEffect, useRef, useState} from "react"
import * as topojson from "topojson-client"
import usaGeo from "./json/us-state.json"
import usaConfirmed from "./json/us_confirmed.json"

type Tooltip = {
  x: number
  y: number
  state: string
  confirmed: number
} | null


export const CovidGeoUsa = () => {
  const ref = useRef<HTMLDivElement>(null)
  const [tooltip, setTooltip] = useState<Tooltip>(null)

  const width  = 975,
        height = 610

  const color = scaleSequential()
    .interpolator(interpolateRgb("#f8d7d7", "#fc1047"))
    .domain(extent(usaConfirmed, i => i.confirmed))

  const handleMouseover = (event: any, d: any) => {
    const pos = pointer(event)
    setTooltip({
      x: pos[0],
      y: pos[1],
      state: d.properties.name,
      confirmed: usaConfirmed.find(j => j.state === d.properties.name)?.confirmed || 0
    })
  }

  useEffect(() => {
    // @ts-ignore
    const features = topojson.feature(usaGeo, usaGeo.objects.states).features
    // @ts-ignore
    const mesh = topojson.mesh(usaGeo, usaGeo.objects.states, (a, b) => a !== b)

    const svg = select(ref.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height)

    const path = geoPath()

    svg.append("g")
      .selectAll("path")
      .data(features)
      .join("path")
      .attr("d", path)
      // @ts-ignore
      .attr("fill", d => color(usaConfirmed.find(j => j.state === d.properties.name)?.confirmed || 0))
      .on("mouseenter", handleMouseover)
      .on("mousemove", handleMouseover)
      .on("mouseleave", () => setTooltip(null))

    svg.append("path")
      .datum(mesh)
      .attr("fill", "none")
      .attr("stroke", "white")
      .attr("stroke-width", 1.2)
      .attr("stroke-linejoin", "round")
      .attr("d", path)
  }, [])

  return <div ref={ref} className={"relative"}>
    {tooltip &&
      <motion.div
        className={"absolute flex flex-col min-w-[140px] max-w-[350px] px-2 py-1.5 text-sm text-red-400 bg-white rounded-md"}
        style={{
          left: tooltip.x - 10,
          top: tooltip.y + 30
        }}>
        <div>州/省 {tooltip.state}</div>
        <div>确诊数 {format("~s")(tooltip.confirmed)}</div>
      </motion.div>}
  </div>
}
