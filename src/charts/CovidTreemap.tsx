import {ResponsiveTreeMap} from "@nivo/treemap"
import DATA from "./json/global_tree.json"

export const CovidTreemap = ({className}: { className: string }) => <div className={className}>
  <ResponsiveTreeMap
    data={DATA}
    tile={"binary"}
    identity={"name"}
    value={"confirmed"}
    valueFormat={".02s"}
    innerPadding={4}
    outerPadding={2}
    margin={{top: 10, right: 10, bottom: 10, left: 10}}
    colors={{scheme: "paired"}}
    label={d => d.id}
    labelSkipSize={20}
    labelTextColor={{from: "color", modifiers: [["darker", 1.2]]}}
    parentLabelTextColor={{from: "color", modifiers: [["darker", 2]]}}
    borderColor={{from: "color", modifiers: [["darker", 0.1]]}}
  />
</div>
