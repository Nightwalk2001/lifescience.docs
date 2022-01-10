import {extent, geoMercator, geoPath, interpolateRgb, scaleSequential, select, zoom} from "d3"
import React, {useEffect, useRef} from "react"
import * as topojson from "topojson-client"
import world from "./json/demo.json"
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

  const width  = 975,
        height = 610

  const color = scaleSequential()
    .interpolator(interpolateRgb("#f3f0f0", "#ec3761"))
    .domain(extent(worldConfirm, i => i.confirmed))

  // @ts-ignore
  const features = topojson.feature(world, world.objects.countries).features
// @ts-ignore
  const projection = geoMercator().fitSize([width, height], topojson.feature(world, world.objects.countries))
// @ts-ignore
  const meshes = topojson.mesh(world, world.objects.countries, (a, b) => a !== b)

  useEffect(() => {
    const svg = select(ref.current)
    const zoomed = (event) => {
      const t = event.transform
      svg.select("g")
        .attr("transform", `translate(${t.x}, ${t.y}) scale(${t.k})`)
    }

    const zoomEvent = zoom()
      .scaleExtent([0.5, 10])
      .on("zoom", zoomed)
    svg.call(zoomEvent)
  }, [])

  return <div className={"relative"}>
    <svg ref={ref} width={width} height={height}>
      <g>
        {features.map(d => <path
          key={d[0]}
          d={geoPath().projection(projection)(d)}
          fill={color(worldConfirm.find(j => j.country === d.properties.name)?.confirmed || 0)}
        />)}
        {/*<path d={geoPath()(meshes)} fill={"none"} stroke={"#3eeed3"} strokeWidth={1.2} strokeLinejoin={"round"}/>*/}
      </g>
    </svg>

    <div className={"absolute"}>

    </div>
  </div>
}