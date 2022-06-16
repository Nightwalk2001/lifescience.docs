import {useSvgSize}                                                                             from "@/hooks"
import {area, curveNatural, randomInt, scaleLinear, scaleOrdinal, stack, stackOffsetSilhouette} from "d3"
import {random}                                                                                 from "nanoid"
import {useEffect, useRef}                                                                      from "react"
import data                                                                                     from "./stream.json"

type Data = {
  year: number
}

export const StreamGraph = () => {
  const ref = useRef<SVGGElement>(null)
  const margin                = {left: 160, right: 120, top: 50, bottom: 60},
        {w, h, width, height} = useSvgSize(1200, 300, margin)

  const x     = scaleLinear()
          .domain([2000, 2050])
          .range([0, width]),
        y     = scaleLinear()
          .domain([-3.65, 3.65])
          .range([height, 0]),
        color = scaleOrdinal<string>()
          .range([
            "#636efa", "#c286fa", "#aa63f9",
            "#19d1f1", "#fe6691", "#297fe1",
            "#f6c9e0", "#fecb52"
          ])

  const stacked = stack()
    .offset(stackOffsetSilhouette)
    .keys(["group-1", "group-2", "group-3", "group-4", "group-5", "group-6", "group-7"])
    (data)

  const areaFn = area<any>()
    .x(d => x(d.data.year))
    .y0(d => y(d[0]))
    .y1(d => y(d[1]))
    .curve(curveNatural)

  useEffect(() => {
    const res = []

    const startYear = 2000

    for (let i = 0; i < 50; i++) {
      let tmp = {}
      tmp["year"] = startYear + i
      for (let j = 1; j < 8; j++) {
        tmp[`group-${j}`] = Math.random() * (j *5 + 1) / 10
      }
      res.push(tmp)
    }

    console.log(res)
  }, [])

  return <div className={"relative"}>

    <svg width={w} height={h}>
      <g ref={ref} transform={`translate(${margin.left}, ${margin.top})`}>
        {stacked.map((d, i) => <path k={d.key} d={areaFn(d)} fill={color(d.key)}/>)}
      </g>
    </svg>
  </div>
}
