import React from 'react';
import { ResponsiveLine } from '@nivo/line'


let sample2 = [
    {
        "id": "japan",
        "color": "hsl(258, 70%, 50%)",
        "data": [
          {
            "x": 2,
            "y": 247
          },
          {
            "x": 3,
            "y": 90
          },
          {
            "x": 4,
            "y": 45
          },
          {
            "x": 4.3,
            "y": 155
          },
          {
            "x": 5,
            "y": 270
          },
          {
            "x": 6,
            "y": 263
          },
          {
            "x": 7,
            "y": 8
          },
          {
            "x": 8,
            "y": 49
          },
          {
            "x": 9,
            "y": 64
          },
          {
            "x": 10,
            "y": 91
          },
          {
            "x": 11,
            "y": 34
          },
          {
            "x": 12,
            "y": 196
          }
        ]
      },
]


const MyResponsiveLine = ({ data /* see data tab */ }) => {
    console.log('MyResponsiveLine')
    return (
    <ResponsiveLine
        data={data || sample2}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        //xScale={{ type: 'point' }}
        xScale={{
            type: 'log',
            base: 2,
            max: 'auto',
        }}
        yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            orient: 'bottom',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'transportation',
            legendOffset: 36,
            legendPosition: 'middle'
        }}
        axisLeft={{
            orient: 'left',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'count',
            legendOffset: -40,
            legendPosition: 'middle'
        }}
        colors={{ scheme: 'nivo' }}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabel="y"
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
            {
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: 'left-to-right',
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: 'circle',
                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemBackground: 'rgba(0, 0, 0, .03)',
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
    />
)}

export default MyResponsiveLine