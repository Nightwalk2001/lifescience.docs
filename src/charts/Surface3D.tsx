const echarts = require("echarts")
require("echarts-gl")
import {useEffect, useRef} from "react"

export const Surface3D = () => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {

    const chartDom = ref?.current
    const myChart = echarts.init(chartDom!)
    const option = {
      tooltip: {},
      backgroundColor: "#fff",
      visualMap: {
        show: false,
        dimension: 2,
        min: -1,
        max: 1,
        inRange: {
          color: [
            "#313695",
            "#4575b4",
            "#74add1",
            "#abd9e9",
            "#e0f3f8",
            "#ffffbf",
            "#fee090",
            "#fdae61",
            "#f46d43",
            "#d73027",
            "#a50026"
          ]
        }
      },
      xAxis3D: {
        type: "value"
      },
      yAxis3D: {
        type: "value"
      },
      zAxis3D: {
        type: "value"
      },
      grid3D: {
        viewControl: {
          // projection: 'orthographic'
        }
      },
      series: [
        {
          type: "surface",
          wireframe: {
            // show: false
          },
          equation: {
            x: {
              step: 0.04
            },
            y: {
              step: 0.04
            },
            z: (x: number, y: number) => 0.7 * Math.sin(x * Math.PI) + 0.9 * Math.sin(y * Math.PI)
          }
        }
      ]
    }
    myChart.setOption(option)
  }, [])

  return <div ref={ref} className={"w-[500px] h-[500px]"}/>
}
