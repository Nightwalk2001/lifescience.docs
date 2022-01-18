import {hierarchy, scaleOrdinal, treemap} from "d3"
import {motion} from "framer-motion"
import {useInView} from "react-intersection-observer"
import treedata from "./json/global_tree.json"

export const CovidTreemap = () => {
  const {ref, inView} = useInView({triggerOnce: true})

  const width  = 900,
        height = 600,
        bottom = 50

  // @ts-ignore
  const data0 = hierarchy(treedata).sum(d => d.confirmed)

  const data = treemap()
    .size([width, height])
    .paddingInner(2)
    .paddingOuter(4)
    .round(true)
    (data0)

  const color = scaleOrdinal<string>()
    .domain(new Set(treedata.children.map(i => i.name)))
    .range([
      "#929afc",
      "#b829f1",
      "#4ddbb6",
      "#c492fc",
      "#ffbd8c",
      "#5ee0f7",
      "#ffb6ff",
      "#929afc",
      "#f48876",
      "#3eeed3",
      "#ea708d",
      "#2231e8",
      "#76f48b"
    ])

  return <div ref={ref}>
    <svg width={width} height={height}>
      {data.leaves().map((d, i) =>
        <motion.rect
          key={`${d.x0}-${d.x1}`}
          animate={{
            width: [0, d.x1 - d.x0],
            height: [0, d.y1 - d.y0],
            transition: {duration: 0.01, delay: i * 0.0102}
          }}
          x={d.x0}
          y={d.y0}
          fill={color(`${i}`)}
          stroke={"#fdf7f7"}
          strokeWidth={0.5}
        />)}
    </svg>
  </div>
}
