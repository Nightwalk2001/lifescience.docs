import {extent, format, hierarchy, interpolateRgb, pointer, scaleSequential, treemap} from "d3"
import {motion} from "framer-motion"
import React, {useState} from "react"
import {useInView} from "react-intersection-observer"
import treedata from "../json/global_tree.json"

const continents = [
  "Asia", "Europe", "Africa", "North America",
  "South America", "Diamond Princess", "Oceania", "Holy See",
  "Ivory Coast", "Laos", "MS Zaandam", "Timor-Leste", "Macau"
]
const colors = [
  "#3eeed3", "#ec77c7", "#e82878",
  "#c492fc", "#fdd45b", "#5ee0f7",
  "#ffb6ff", "#929afc", "#f48876",
  "#3eeed3", "#ea708d", "#2231e8", "#76f48b"
]

type Tooltip = {
  x: number
  y: number
  continent: string
  country: string
  confirmed: number
} | null

export const CovidTreemap = () => {
  const {ref, inView} = useInView({triggerOnce: true})
  const [tooltip, setTooltip] = useState<Tooltip>(null)

  const width  = 900,
        height = 600

  // @ts-ignore
  const data0 = hierarchy(treedata).sum(d => d.confirmed)

  const data = treemap()
    .size([width, height])
    .paddingInner(0.3)
    .paddingOuter(7)
    .round(true)
    (data0)

  const color = (continent: string) => scaleSequential()
    .domain(
      extent(treedata.children
          .find(i => i.name === continent)
          .children,
        i => i.confirmed)
    )
    .interpolator(
      interpolateRgb(
        "#f3f0f0",
        colors[continents.findIndex(i => i === continent)]
      ))

  const handleMouse = (event: any, d: any) => {
    const pos = pointer(event)
    setTooltip({
      x: pos[0],
      y: pos[1],
      continent: (d.parent.data as any).name,
      country: (d.data as any).name,
      confirmed: d.value
    })
  }

  return <div ref={ref} className={"relative"}>
    <svg width={width} height={height}>
      {data.leaves().map((d, i) => {
        const w        = d.x1 - d.x0,
              h        = d.y1 - d.y0,
              xm       = (d.x0 + d.x1) / 2,
              ym       = (d.y0 + d.y1) / 2,
              ybw      = w < h * 0.9,
              fontSize = Math.max(9, 0.22 * (ybw ? w : h))

        return <g
          key={i}
          className={"cursor-pointer"}
          onMouseEnter={(event) => handleMouse(event, d)}
          onMouseMove={(event) => handleMouse(event, d)}
          onMouseLeave={() => setTooltip(null)}
        >
          <motion.rect
            animate={{
              width: [0, inView ? d.x1 - d.x0 : 0],
              height: [0, inView ? d.y1 - d.y0 : 0],
              transition: {duration: 0.01, delay: i * 0.0102}
            }}
            x={d.x0}
            y={d.y0}
            fill={color((d.parent.data as any).name)(d.value)}
            fillOpacity={0.9}
            stroke={"#fdf7f7"}
            strokeWidth={1}
          />
          {d.value > 1000000 &&
            <text
              transform={
                ybw ? `translate(${xm + fontSize / 2}, ${ym}) rotate(-90)`
                  : `translate(${xm}, ${ym + fontSize / 2})`
              }
              fontSize={fontSize}
              fontWeight={500}
              textAnchor={"middle"}
              fill={"#fff"}
            >
              {(d.data as any).name}
            </text>}
        </g>
      })}
    </svg>

    {
      tooltip &&
      <div
        className={"absolute flex min-w-[140px] max-w-[380px] px-3 py-2.5 text-sm text-sky-400 bg-white rounded-md"}
        style={{
          left: tooltip.x - 5,
          top: tooltip.y + 30
        }}>
        <div className={"flex flex-col font-semibold"}>
          <span>大洲：</span>
          <span>国家/地区：</span>
          <span>确诊数：</span>
        </div>
        <div className={"flex flex-col"}>
          <span>{tooltip.continent}</span>
          <span> {tooltip.country}</span>
          <span>{format("~s")(tooltip.confirmed)}</span>
        </div>
      </div>
    }
  </div>
}
