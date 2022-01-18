import {Grid} from "@visx/grid"
import {LegendThreshold} from "@visx/legend"
import {
  extent,
  format,
  geoMercator,
  geoPath,
  interpolateRgb,
  pointer,
  scaleLinear,
  scaleSequentialSqrt,
  scaleThreshold
} from "d3"
import {motion} from "framer-motion"
import React, {useState} from "react"
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
  const [tooltip, setTooltip] = useState<Tooltip>(null)

  const width  = 900,
        height = 500

  const x = scaleLinear().range([0, width]),
        y = scaleLinear().range([height, 0])

  const color = scaleSequentialSqrt<string, never>()
    .domain(extent(worldConfirm, i => i.confirmed))
    .interpolator(interpolateRgb("#9dfaeb", "#9c67f6"))

  // @ts-ignore
  const features = topojson.feature(world, world.objects.global).features
// @ts-ignore
  const projection = geoMercator().fitSize([width, height], topojson.feature(world, world.objects.global))
// @ts-ignore
  const meshes = topojson.mesh(world, world.objects.global, (a, b) => a !== b)

  const steps = [0, 100 * 10000, 200 * 10000, 300 * 10000, 400 * 10000, 500 * 10000, 600 * 10000]

  const threshold = scaleThreshold<number, string>()
    .domain(steps)
    .range(steps.map(i => color(i)))

  const handleMouse = (event: any, d: any) => {
    const pos = pointer(event)
    setTooltip({
      x: pos[0],
      y: pos[1],
      state: d.properties.name,
      confirmed: worldConfirm.find(j => j.country === d.properties.name)?.confirmed || 0
    })
  }

  return <div className={"relative"}>
    <svg width={width} height={height}>
      <Grid width={width} height={height} xScale={x} yScale={y}/>
      <g>
        {features.map(d => <motion.path
          key={d.properties.name}
          d={geoPath().projection(projection)(d)}
          fill={color(worldConfirm.find(j => j.country === d.properties.name)?.confirmed || 0)}
          opacity={0.9}
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

    <LegendThreshold
      scale={threshold}
      direction={"column-reverse"}
      labelFormat={(d) => format(".2s")(d)}
      shapeWidth={28}
      shapeHeight={28}
      className={"absolute left-[25px] bottom-[30px] px-3 py-2 bg-gray-50 rounded-md text-sm cursor-pointer"}
    />

    {
      tooltip &&
      <div
        className={"absolute flex min-w-[140px] max-w-[350px] px-3 py-2.5 text-sm text-[#fe6691] bg-white rounded-md"}
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