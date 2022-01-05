// const res = {
//   male: {
//     p: a4p.map(i => +i.male).filter(i => i !== 0),
//     h: a4h.map(i => +i.male).filter(i => i !== 0),
//     l: a4l.map(i => +i.male).filter(i => i !== 0)
//   },
//   female: {
//     p: a4p.map(i => +i.female),
//     h: a4h.map(i => +i.female),
//     l: a4l.map(i => +i.female)
//   }
// }

// const norm1 = line()
//     // @ts-ignore
//     .x(d => normX(d))
//     // @ts-ignore
//     .y(d => y(norm(d, miu1, sigma1)))
//     .curve(curveNatural)
//
// const norm2 = line()
//     // @ts-ignore
//     .x(d => normX(d))
//     // @ts-ignore
//     .y(d => y(norm(d, miu2, sigma2)))
//     .curve(curveNatural)

// const countGroup = svg.selectAll("group")
//   .data(data)
//   .join("g")
//   .attr("stroke", "none")
//   .attr("opacity", 0.7)
//
// countGroup.append("rect")
//   .attr("x", d => x(d[0]))
//   .attr("y", d => y(d[1].filter(i => i.sex === "male").length / 418 / 4))
//   .transition()
//   .duration(1000)
//   .delay((_, i) => i * 1200)
//   .attr("width", x.bandwidth() / 2)
//   .attr("height", d => height - y(d[1].filter(i => i.sex === "male").length / 418 / 4))
//   .attr("fill", "#57d7ec")
//
// countGroup.append("rect")
//   .attr("x", d => x(d[0]) + x.bandwidth() / 2)
//   .attr("y", d => y(d[1].filter(i => i.sex === "female").length / 516 / 4))
//   .transition()
//   .duration(1000)
//   .delay((_, i) => i * 1200)
//   .attr("width", x.bandwidth() / 2)
//   .attr("height", d => height - y(d[1].filter(i => i.sex === "female").length / 516 / 4))
//   .attr("fill", "#ec77c7")

// svg.append("path")
//   // @ts-ignore
//   .attr("d", norm1(normX.ticks(90)))
//   .attr("fill", "none")
//   .attr("stroke", "#57d7ec")
//   .attr("stroke-width", 3)
//
// svg.append("path")
//   // @ts-ignore
//   .attr("d", norm2(normX.ticks(90)))
//   .attr("fill", "none")
//   .attr("stroke", "#ec77c7")
//   .attr("stroke-width", 3)

export {}