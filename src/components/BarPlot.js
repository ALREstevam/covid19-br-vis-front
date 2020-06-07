import React from 'react'
import { ResponsiveBar } from '@nivo/bar'

const BarPlot = ({data, keys, index, xTitle, yTitle, 
    groupMode='grouped', layout='vertical', colors=['#F47560', '#61CDBB']}) => (
    <ResponsiveBar
        data={data}
        keys={keys}
        indexBy={index}
        margin={{ top: 50, right: 130, bottom: 50, left: 110 }}
        padding={0.3}
        groupMode={groupMode}
        layout={layout}
        minValue={0}
        colors={ colors }
        
        borderColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: xTitle || 'x',
            legendPosition: 'middle',
            legendOffset: 32
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: yTitle || "y",
            legendPosition: 'middle',
            legendOffset: -90,
        }}
        labelSkipWidth={0}
        labelSkipHeight={0}
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