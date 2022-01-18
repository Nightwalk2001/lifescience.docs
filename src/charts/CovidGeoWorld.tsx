import {extent, format, geoMercator, geoPath, interpolateRgb, pointer, scaleSequentialSqrt, select, zoom} from "d3"
import {motion} from "framer-motion"
import React, {useEffect, useRef, useState} from "react"
import * as topojson from "topojson-client"
import world from "./json/global.json"
import worldConfirm from "./json/global_confirmed.json"

type CovidGeoProps = {}

type Tooltip = {
  x: number
  y: number
  state: string
  confirmed: number
} | null

export const CovidGeoWorld: React.FC<CovidGeoProps> = () => {
  const ref = useRef<SVGSVGElement>(null)
  const [tooltip, setTooltip] = useState<Tooltip>(null)

  const width  = 975,
        height = 610

  const color = scaleSequentialSqrt<string, never>()
    .domain(extent(worldConfirm, i => i.confirmed))
    .interpolator(interpolateRgb("#ffffff", "#ec3761"))

  // @ts-ignore
  const features = topojson.feature(world, world.objects.global).features
// @ts-ignore
  const projection = geoMercator().fitSize([width, height], topojson.feature(world, world.objects.global))
  // @ts-ignore
  const meshes = topojson.mesh(world, world.objects.global, (a, b) => a !== b)

  const handleMouse = (event: any, d: any) => {
    const pos = pointer(event)
    setTooltip({
      x: pos[0],
      y: pos[1],
      state: d.properties.name,
      confirmed: worldConfirm.find(j => j.country === d.properties.name)?.confirmed || 0
    })
  }

  useEffect(() => {
    const svg = select(ref.current)
    const zoomed = (event) => {
      const t = event.transform
      svg.select("g")
        .attr("transform", `translate(${t.x}, ${t.y}) scale(${t.k})`)
    }

    const zoomEvent = zoom()
      .scaleExtent([0.8, 3])
      .on("zoom", zoomed)
    svg.call(zoomEvent)
  }, [])

  return <div className={"relative"}>
    <svg ref={ref} width={width} height={height}>
      <rect x={0} y={0} width={width} height={height} fill={"#e5e3e3"} rx={14} opacity={0.8}/>
      <g>
        {features.map(d => <motion.path
          key={d.properties.name}
          d={geoPath().projection(projection)(d)}
          opacity={0.9}
          animate={{
            fill: ["#fff", color(worldConfirm.find(j => j.country === d.properties.name)?.confirmed || 0)],
            transition: {duration: 2}
          }}
          onMouseEnter={(event) => handleMouse(event, d)}
          onMouseMove={(event) => handleMouse(event, d)}
          onTouchStart={(event) => handleMouse(event, d)}
          onTouchMove={(event) => handleMouse(event, d)}
          onMouseLeave={() => setTooltip(null)}
        />)}
        <path
          d={geoPath().projection(projection)(meshes)}
          fill={"none"}
          stroke={"#fff"}
          strokeWidth={0.8}
          strokeLinejoin={"round"}
          opacity={0.8}/>
      </g>
    </svg>

    {
      tooltip &&
      <div
        className={"absolute flex min-w-[140px] max-w-[350px] px-3 py-2.5 text-sm text-indigo-400 bg-white rounded-md"}
        style={{
          left: tooltip.x - 5,
          top: tooltip.y + 30
        }}>
        <div className={"flex flex-col font-semibold"}>
          <span>国家/地区：</span>
          <span>确诊数：</span>
        </div>
        <div className={"flex flex-col"}>
          <span> {tooltip.state}</span>
          <span>{format("~s")(tooltip.confirmed)}</span>
        </div>
      </div>
    }
  </div>
}