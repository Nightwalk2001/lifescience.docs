import {extent, scaleLinear, scaleOrdinal, scaleUtc} from "d3"

export const useChartColor1 = () => scaleOrdinal()
    .range([
        "#636efa", "#ee553b", "#00cb95", "#aa63f9",
        "#fda059", "#19d1f1", "#fe6691", "#b5e77f",
        "#ff97ff", "#fecb52"
    ])

export const useUtc = (start: string, end: string, width: number) =>
    scaleUtc()
        .domain([new Date(start), new Date(end)])
        .range([0, width])
        .nice()

export const useMinMax = (iter: Iterable<number>, maxSize: number, x: boolean = false) => scaleLinear()
    .domain(extent(iter))
    .range(x ? [0, maxSize] : [maxSize, 0])
    .nice()