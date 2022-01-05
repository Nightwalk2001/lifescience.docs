import {useSvgSize} from "@/hooks"
import {axisBottom, axisLeft, bin, curveNatural, line, mean, scaleLinear, scaleOrdinal, select} from "d3"
import {exp, pi, std} from "mathjs"
import React, {useEffect, useRef} from "react"

const norm = (x: number, miu: number, sigma: number) => exp(-((x - miu) ** 2 / (2 * sigma ** 2))) / ((2 * pi) ** 0.5 * sigma)
const skew = (arr: number[], m = mean(arr), sigma = std(arr), n = arr.length) =>
  arr.reduce((res, value) => res += ((value - m) / sigma) ** 3, 0) / n

type ChartProps = {
  rawData: {
    p: number[],
    h: number[],
    l: number[]
  },
  minMax: [number, number],
  percentage: number
}

export const GeneticsDistribution: React.FC<ChartProps> = ({rawData, minMax, percentage}) => {
  const ref = useRef<SVGGElement>(null)

  const margin                = {left: 40, right: 40, top: 20, bottom: 40},
        {w, h, width, height} = useSvgSize(900, 500, margin)

  const x     = scaleLinear()
          .domain([16, 54])
          .range([0, width]),
        y     = scaleLinear()
          .domain([0, 0.13])
          .range([height, 0])
          .nice(),
        color = scaleOrdinal<string>()
          .range(["#4ddbb6", "#929afc", "#ffb6ff"]),
        group = scaleOrdinal<string>()
          .range(["亲本组", "高选择组", "低选择组"])

  const normLine = (miu: number, sigma: number) => line()
    // @ts-ignore
    .x(d => x(d))
    // @ts-ignore
    .y(d => y(norm(d, miu, sigma)))
    .curve(curveNatural)

  const data = [rawData.p, rawData.h, rawData.l]
  const sizes = data.map(i => i.length)

  const bin1 = bin().domain([20, 54]).thresholds(12)
  const binData = data.map(i => bin1(i))

  useEffect(() => {
    const svg = select(ref.current)
    svg.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(axisBottom(x).ticks(20).tickSize(0).tickPadding(9))

    svg.select(".left")
      // @ts-ignore
      .call(axisLeft(y).tickSize(0).tickPadding(9))
      .call(g => g.selectAll(".tick line").clone()
        .attr("x2", width)
        .attr("stroke", "#fff")
        .attr("stroke-width", 1.3)
      )

    svg.selectAll(".domain").remove()
    svg.selectAll("text").style("font-size", 14)
  }, [])

  return <div className={"relative"}>

    <svg width={w} height={h} id={"s"}>
      <g ref={ref} transform={`translate(${margin.left}, ${margin.top})`}>
        <rect x={0} y={0} width={width} height={height} fill={"#f9f9fd"}/>
        <g className={"left"}/>
        {
          data.map((d0, i) =>
            <g
              key={d0.length}
              fill={color(`${i}`)}
              opacity={0.7}
              transform={`translate(${(x(26) - x(24)) / 3 * i} , 0)`}>
              {bin1(d0).map(d =>
                <rect
                  key={`${d.x0}-${d.x1}`}
                  x={1}
                  width={(x(d.x1) - x(d.x0)) / 3}
                  height={height - y(d.length / sizes[i] / 2)}
                  transform={`translate(${x(d.x0)} , ${y(d.length / sizes[i] / 2)})`}/>)}
            </g>)
        }

        {
          data.map((d, i) =>
            <path
              key={d.length}
              // @ts-ignore
              d={normLine(mean(d), std(d))(x.ticks(20))}
              fill={"none"}
              stroke={color(`${i}`)}
              strokeWidth={3}
              transform={`translate(${(x(26) - x(24)) / 3 * i} , 0)`}
            />)
        }

        {
          data.map((d, i) =>
            <path
              key={d.length}
              d={`M${x(mean(d))},${height} L${x(mean(d))},${y(norm(mean(d), mean(d), std(d)))} Z`}
              fill={"none"}
              stroke={"#353636"}
              strokeWidth={1.7}
              strokeDasharray={"4 5"}
              opacity={0.7}
              transform={`translate(${(x(26) - x(24)) / 3 * i} , 0)`}
            />)
        }
      </g>
    </svg>

    <div className={"absolute left-[70px] top-0 flex flex-col space-y-1 px-2 py-1.5 bg-gray-100 rounded-md"}>
      {
        data.map((d, i) => <div key={d.length} className={"flex items-center space-x-3"}>
          <div className={`w-[30px] h-[30px] bg-blue-400`} style={{backgroundColor: color(`${i}`)}}/>
          <span className={"text-sm font-medium text-gray-700"}>{group(`${i}`)} <br/>
            <span className={"font-mono"}>μ={mean(d).toFixed(2)}</span>
            <span className={"font-mono mx-1"}>σ={std(d).toFixed(2)}</span>
            <span className={"font-mono"}>S={skew(d).toFixed(2)}</span>
          </span>
        </div>)
      }
    </div>
  </div>
}
