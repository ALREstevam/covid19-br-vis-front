import React from 'react'
import { ResponsiveBar } from '@nivo/bar'
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

/*
[
  {
    "country": "AD",
    "hot dog": 147,
    "hot dogColor": "hsl(27, 70%, 50%)",
    "burger": 50,
    "burgerColor": "hsl(322, 70%, 50%)",
    "sandwich": 40,
    "sandwichColor": "hsl(21, 70%, 50%)",
    "kebab": 162,
    "kebabColor": "hsl(244, 70%, 50%)",
    "fries": 78,
    "friesColor": "hsl(62, 70%, 50%)",
    "donut": 170,
    "donutColor": "hsl(6, 70%, 50%)"
  },
  {
    "country": "AE",
    "hot dog": 34,
    "hot dogColor": "hsl(272, 70%, 50%)",
    "burger": 63,
    "burgerColor": "hsl(192, 70%, 50%)",
    "sandwich": 158,
    "sandwichColor": "hsl(359, 70%, 50%)",
    "kebab": 12,
    "kebabColor": "hsl(278, 70%, 50%)",
    "fries": 36,
    "friesColor": "hsl(219, 70%, 50%)",
    "donut": 115,
    "donutColor": "hsl(221, 70%, 50%)"
  },

  {
      state: "SP",
      casos": 0,
      óbitos: 0,
  }
  {
      state: "RJ",
      casos": 0,
      óbitos: 0,
  }


*/



const BarPlot = ({ data /* see data tab */ }) => (
    <ResponsiveBar
        data={data}
        keys={[ 'hot dog', 'burger', 'sandwich', 'kebab', 'fries', 'donut' ]}
        indexBy="country"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        groupMode="grouped"
        layout="horizontal"
        colors={{ scheme: 'nivo' }}
        defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: '#38bcb2',
                size: 4,
                padding: 1,
                stagger: true
            },
            {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: '#eed312',
                rotation: -45,
                lineWidth: 6,
                spacing: 10
            }
        ]}
        fill={[
            {
                match: {
                    id: 'fries'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'sandwich'
                },
                id: 'lines'
            }
        ]}
        borderColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'country',
            legendPosition: 'middle',
            legendOffset: 32
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'food',
            legendPosition: 'middle',
            legendOffset: -40
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
        legends={[
            {
                dataFrom: 'keys',
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 120,
                translateY: 0,
                itemsSpacing: 2,
                itemWidth: 100,
                itemHeight: 20,
                itemDirection: 'left-to-right',
                itemOpacity: 0.85,
                symbolSize: 20,
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
    />
)

export default BarPlot