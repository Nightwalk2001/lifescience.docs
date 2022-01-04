import {select} from "d3"
import {MutableRefObject, useEffect} from "react"

export const useSvgRoot = (ref: MutableRefObject<HTMLElement>, w: number, h: number,
                           margin: {
                               left: number,
                               right: number,
                               top: number,
                               bottom: number
                           }) =>
    useEffect(() => {
        select(ref.current)
            .append("svg")
            .attr("width", w)
            .attr("height", h)
            .append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`)
    }, [])
