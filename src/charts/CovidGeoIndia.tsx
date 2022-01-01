import {extent, format, geoMercator, geoPath, interpolateRgb, pointer, scaleSequential, select} from "d3"
import {AnimatePresence, motion} from "framer-motion"
import {useEffect, useRef, useState} from "react"
import indiaConfirmed from "./json/ind_confirmed.json"
import indiaGeo from "./json/ind_state.json"

type Tooltip = {
  x: number
  y: number
  state: string
  confirmed: number
} | null

export const CovidGeoIndia = () => {
  const ref = useRef<HTMLDivElement>(null)

  const [tooltip, setTooltip] = useState<Tooltip>()

  const width  = 575,
        height = 610

  const color = scaleSequential()
    .interpolator(interpolateRgb("#bccef5", "#0b82fd"))
    .domain(extent(indiaConfirmed, i => i.confirmed))

  const handleMouseover = (event: any, d: any) => {
    const pos = pointer(event)
    setTooltip({
      x: pos[0],
      y: pos[1],
      state: d.properties.name,
      confirmed: indiaConfirmed.find(j => j.state === d.properties.name)?.confirmed || 0
    })
  }

  useEffect(() => {
    const features = indiaGeo.features

    const svg = select(ref.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height)

    const path = geoPath()
    // @ts-ignore
    const projection = geoMercator().fitSize([width, height], indiaGeo)

    const state = svg.append("g")
      .selectAll("path")
      .data(features)
      .join("g")

    state.append("path")
      // @ts-ignore
      .attr("d", path.projection(projection))
      .attr("fill", d => color(indiaConfirmed.find(j => j.state === d.properties.name)?.confirmed) || 0)
      .on("mouseenter", handleMouseover)
      .on("mousemove", handleMouseover)
      .on("mouseleave", () => setTooltip(null))
  }, [])

  return <div ref={ref} className={"relative"}>
    <AnimatePresence>
      {tooltip &&
        <motion.div
          exit={{opacity: [1, 0], transition: {duration: 0.5}}}
          className={"absolute flex flex-col min-w-[140px] max-w-[350px] px-2 py-1.5 text-sm text-cyan-400 bg-white rounded-md"}
          style={{
            left: tooltip.x - 10,
            top: tooltip.y + 30
          }}>
          <div>州/省 {tooltip.state}</div>
          <div>确诊数 {format("~s")(tooltip.confirmed)}</div>
        </motion.div>}
    </AnimatePresence>
  </div>
}
