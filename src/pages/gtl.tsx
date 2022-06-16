import {
  CovidAgeDistribution, CovidGeo,
  CovidLineDaily,
  CovidLineTrend,
  CovidScatterDensity,
  CovidTreemap, FansChart, GeneticsDistribution,
  StreamGraph
}                     from "@/charts"
import world          from "@/json/global.json"
import worldConfirmed from "@/json/global_confirmed.json"
import usa            from "@/json/usa.json"
import usaConfirmed   from "@/json/usa_confirmed.json"
import {unequal}      from "@/libs"
import * as topo      from "topojson-client"

const geoWorld = topo.feature(world as any, (world as any).objects.global)
const worldMeshes = topo.mesh(world as any, (world as any).objects.global, unequal)
const geoUsa = topo.feature(usa as any, (usa as any).objects.states)
const usaMeshes = topo.mesh(usa as any, (usa as any).objects.states, unequal)

const Gtl = () => {
  return <div
    className={"flex flex-col items-center space-y-32 min-w-[900px] max-w-[80%] mx-auto prose"}>
    <CovidScatterDensity/>
    <CovidAgeDistribution/>
    <CovidLineDaily/>
    <CovidLineTrend/>
    <CovidTreemap/>
    <StreamGraph/>
    <CovidGeo geoFeature={geoWorld} meshes={worldMeshes} data={worldConfirmed} regionName={"国家/地区"}/>
    <CovidGeo
      width={950}
      height={620}
      geoFeature={geoUsa}
      meshes={usaMeshes}
      data={usaConfirmed}
      useProjection={false}
      showLegend={false}
      regionName={"州/省"}
      tooltipColor={"#57d7ec"}
    />
  </div>
}

export default Gtl
