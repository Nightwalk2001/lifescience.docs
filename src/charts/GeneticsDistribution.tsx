import {useSvgSize} from "@/hooks"
import {axisBottom, axisLeft, bin, curveNatural, line, mean, scaleLinear, scaleOrdinal, select} from "d3"
import {motion} from "framer-motion"
import {exp, pi, std} from "mathjs"
import React, {memo, useEffect, useRef} from "react"

const norm = (x: number, miu: number, sigma: number) => exp(-((x - miu) ** 2 / (2 * sigma ** 2))) / ((2 * pi) ** 0.5 * sigma)
const skew = (arr: number[], m = mean(arr), sigma = std(arr), n = arr.length) =>
  arr.reduce((res, value) => res += ((value - m) / sigma) ** 3, 0) / n

type ChartProps = {
  rawData: {
    p: number[],
    h: number[],
    l: number[]
  },
  minMax?: [number, number],
  percentage?: number,
  pos?: "left" | "right",
  colors?: [string, string, string]
}

export const GeneticsDistribution: React.FC<ChartProps> = memo(
  ({
     rawData,
     minMax = [16, 54],
     percentage = 0.13,
     pos = "left",
     colors = ["#4ddbb6", "#929afc", "#ffb6ff"]
   }) => {
    const ref = useRef<SVGGElement>(null)

    const margin                = {left: 40, right: 40, top: 20, bottom: 40},
          {w, h, width, height} = useSvgSize(900, 500, margin)

    const x     = scaleLinear()
            .domain(minMax)
            .range([0, width]),
          y     = scaleLinear()
            .domain([0, percentage])
            .range([height, 0])
            .nice(),
          color = scaleOrdinal<string>()
            .range(colors),
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
        .call(axisLeft(y).ticks(6).tickSize(0).tickPadding(9))
        .call(g => g.selectAll(".tick line").clone()
          .attr("x2", width)
          .attr("stroke", "#fff")
          .attr("stroke-width", 1.3)
        )

      svg.selectAll(".domain").remove()
      svg.selectAll("text").style("font-size", 14)
    }, [])

    return <div className={"relative my-10"}>

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
                  <motion.rect
                    animate={{
                      y: [height, y(d.length / sizes[i] / 2)],
                      height: [0, height - y(d.length / sizes[i] / 2)],
                      transition: {duration: 1, delay: i * 1.02}
                    }}
                    key={`${d.x0}-${d.x1}`}
                    x={x(d.x0) + 0.5}
                    width={(x(d.x1) - x(d.x0)) / 3 - 0.5}
                  />)}
              </g>)
          }

          {
            data.map((d, i) =>
              <motion.path
                key={d.length}
                animate={{
                  strokeDasharray: ["0, 1400", "1400, 1400"],
                  transition: {duration: 1.5, delay: i * 1.53}
                }}
                // @ts-ignore
                d={normLine(mean(d), std(d))(x.ticks(15))}
                fill={"none"}
                stroke={color(`${i}`)}
                strokeWidth={3}
                transform={`translate(${(x(26) - x(24)) / 3 * i} , 0)`}
              />)
          }

          {
            data.map((d, i) =>
              <motion.path
                key={d.length}
                animate={{
                  strokeDasharray: ["0, 350", "2, 3"],
                  transition: {duration: 0.5, delay: i * 1.53 + 1.5}
                }}
                d={`M${x(mean(d))},${height} L${x(mean(d))},${y(norm(mean(d), mean(d), std(d)))} Z`}
                fill={"none"}
                stroke={"#353636"}
                strokeWidth={1.2}
                opacity={0.7}
                transform={`translate(${(x(26) - x(24)) / 3 * i} , 0)`}
              />)
          }
        </g>
      </svg>

      <motion.div
        animate={{opacity: [0, 1], transition: {delay: 5}}}
        className={`absolute 
        ${pos === "left" ? "left-[70px] top-[15px]" : "right-[80px] top-[10px]"} 
        flex flex-col space-y-1 px-2 py-1.5 bg-gray-100 rounded-md`}>
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
      </motion.div>
    </div>
  })
