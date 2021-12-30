import {ResponsiveChoropleth} from "@nivo/geo"
import {extent} from "d3"
import Fea from "./json/global.json"
import df from "./json/global_confirmed.json"

export const CovidGeoWorld = ({className}: { className: string }) => <div className={className}>
  <ResponsiveChoropleth
    data={df}
    features={Fea.features}
    margin={{top: 0, right: 0, bottom: 0, left: 0}}
    colors={"reds"}
    domain={extent<number>(df.map(i => i.value)) as [number, number]}
    unknownColor={"#f3f0f0"}
    label={"properties.name"}
    valueFormat={".2s"}
    projectionTranslation={[0.5, 0.5]}
    projectionRotation={[0, 0, 0]}
    enableGraticule={true}
    graticuleLineColor={"#dddddd"}
    borderWidth={0.5}
    borderColor={"#152538"}
    legends={[
      {
        anchor: "bottom-left",
        direction: "column",
        justify: true,
        translateY: -30,
        itemsSpacing: 0,
        itemWidth: 84,
        itemHeight: 18,
        itemDirection: "left-to-right",
        itemTextColor: "#444444",
        itemOpacity: 0.85,
        symbolSize: 15,
        effects: [
          {
            on: "hover",
            style: {
              itemTextColor: "#000000",
              itemOpacity: 1
            }
          }
        ]
      }
    ]}
  />
</div>
