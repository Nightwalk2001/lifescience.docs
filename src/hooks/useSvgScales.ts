import {extent, scaleLinear, scaleUtc} from "d3"

export const useUtc = (start: string, end: string, width: number) =>
    scaleUtc()
        .domain([new Date(start), new Date(end)])
        .range([0, width])
        .nice()

export const useMinMax = (iter: Iterable<number>, maxSize: number, x: boolean = false) => scaleLinear()
    .domain(extent(iter))
    .range(x ? [0, maxSize] : [maxSize, 0])
    .nice()