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
import {MultiLineString} from "geojson"
import React, {useState} from "react"

type CovidGeoProps = {
  width?: number
  height?: number
  geoFeature: any
  meshes: MultiLineString
  data: {
    region: string
    confirmed: number
  }[]
  useProjection?: boolean
  steps?: number[]
  color1?: string
  color2?: string
  showLegend?: boolean
  regionName: string
  tooltipColor?: string
}

type Tooltip = {
  x: number
  y: number
  region: string
  confirmed: number
} | null

export const CovidGeo: React.FC<CovidGeoProps> = ({
                                                    width = 900,
                                                    height = 500,
                                                    geoFeature,
                                                    meshes,
                                                    data,
                                                    useProjection = true,
                                                    steps = [0, 100 * 10000, 200 * 10000,
                                                      300 * 10000, 400 * 10000, 500 * 10000, 600 * 10000],
                                                    color1 = "#9dfaeb",
                                                    color2 = "#9c67f6",
                                                    showLegend = true,
                                                    regionName,
                                                    tooltipColor = "#fe6691"
                                                  }) => {
  const [tooltip, setTooltip] = useState<Tooltip>(null)

  const x = scaleLinear().range([0, width]),
        y = scaleLinear().range([height, 0])

  const projection = geoMercator().fitSize([width, height], geoFeature)

  const pathFn = useProjection ? geoPath().projection(projection) : geoPath()

  const color = scaleSequentialSqrt<string, never>()
    .domain(extent(data, i => i.confirmed))
    .interpolator(interpolateRgb(color1, color2))

  const threshold = scaleThreshold<number, string>()
    .domain(steps)
    .range(steps.map(i => color(i)))

  const confirm = (d: any) => data.find(j => j.region === d.properties.name)?.confirmed || 0

  const handleMouse = (event: any, d: any) => {
    const pos = pointer(event)
    setTooltip({
      x: pos[0],
      y: pos[1],
      region: d.properties.name,
      confirmed: confirm(d)
    })
  }

  return <div className={"relative"}>
    <svg width={width} height={height}>
      <Grid width={width} height={height} xScale={x} yScale={y}/>
      <g>
        {geoFeature.features.map(d =>
          <motion.path
            key={d.properties.name}
            d={pathFn(d)}
            fill={color(confirm(d))}
            opacity={0.75}
            className={"cursor-pointer"}
            whileHover={{opacity: 1, scale: 1.015}}
            onMouseEnter={(event) => handleMouse(event, d)}
            onMouseMove={(event) => handleMouse(event, d)}
            onMouseLeave={() => setTooltip(null)}
          />)}
        <path
          d={pathFn(meshes)}
          fill={"none"}
          stroke={"#fff"}
          strokeWidth={0.8}
          strokeLinejoin={"round"}
          opacity={0.8}/>
      </g>
    </svg>

    {showLegend && <LegendThreshold
      scale={threshold}
      direction={"column-reverse"}
      labelFormat={(d) => format(".2s")(d)}
      shapeWidth={28}
      shapeHeight={28}
      className={"absolute left-[25px] bottom-[30px] px-3 py-2 bg-gray-50 rounded-md text-sm cursor-pointer"}
    />}

    {
      tooltip &&
      <div
        className={`absolute flex min-w-[140px] max-w-[350px] px-3 py-2.5 text-sm bg-white rounded-md`}
        style={{
          left: tooltip.x - 5,
          top: tooltip.y + 30,
          color: tooltipColor
        }}>
        <div className={"flex flex-col font-semibold"}>
          <span>{regionName}：</span>
          <span>确诊数：</span>
        </div>
        <div className={"flex flex-col"}>
          <span> {tooltip.region}</span>
          <span>{format("~s")(tooltip.confirmed)}</span>
        </div>
      </div>
    }
  </div>
}