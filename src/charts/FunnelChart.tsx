import {select} from "d3"
import {useEffect, useRef} from "react"

export const FunnelChart = () => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const svg = select(ref.current)
  })

  return <div ref={ref}/>
}
