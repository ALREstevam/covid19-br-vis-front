import React, { Component } from 'react';
import { ResponsiveLine } from '@nivo/line'

const sample = [
    {
      "id": "japan",
      "color": "hsl(258, 70%, 50%)",
      "data": [
        {
          "x": "plane",
          "y": 247
        },
        {
          "x": "helicopter",
          "y": 90
        },
        {
          "x": "boat",
          "y": 45
        },
        {
          "x": "train",
          "y": 155
        },
        {
          "x": "subway",
          "y": 270
        },
        {
          "x": "bus",
          "y": 263
        },
        {
          "x": "car",
          "y": 8
        },
        {
          "x": "moto",
          "y": 49
        },
        {
          "x": "bicycle",
          "y": 64
        },
        {
          "x": "horse",
          "y": 91
        },
        {
          "x": "skateboard",
          "y": 34
        },
        {
          "x": "others",
          "y": 196
        }
      ]
    },
    {
      "id": "france",
      "color": "hsl(331, 70%, 50%)",
      "data": [
        {
          "x": "plane",
          "y": 73
        },
        {
          "x": "helicopter",
          "y": 54
        },
        {
          "x": "boat",
          "y": 124
        },
        {
          "x": "train",
          "y": 120
        },
        {
          "x": "subway",
          "y": 93
        },
        {
          "x": "bus",
          "y": 69
        },
        {
          "x": "car",
          "y": 278
        },
        {
          "x": "moto",
          "y": 173
        },
        {
          "x": "bicycle",
          "y": 160
        },
        {
          "x": "horse",
          "y": 61
        },
        {
          "x": "skateboard",
          "y": 277
        },
        {
          "x": "others",
          "y": 209
        }
      ]
    },
    {
      "id": "us",
      "color": "hsl(345, 70%, 50%)",
      "data": [
        {
          "x": "plane",
          "y": 234
        },
        {
          "x": "helicopter",
          "y": 265
        },
        {
          "x": "boat",
          "y": 90
        },
        {
          "x": "train",
          "y": 243
        },
        {
          "x": "subway",
          "y": 75
        },
        {
          "x": "bus",
          "y": 250
        },
        {
          "x": "car",
          "y": 299
        },
        {
          "x": "moto",
          "y": 173
        },
        {
          "x": "bicycle",
          "y": 211
        },
        {
          "x": "horse",
          "y": 50
        },
        {
          "x": "skateboard",
          "y": 247
        },
        {
          "x": "others",
          "y": 269
        }
      ]
    },
    {
      "id": "germany",
      "color": "hsl(306, 70%, 50%)",
      "data": [
        {
          "x": "plane",
          "y": 248
        },
        {
          "x": "helicopter",
          "y": 49
        },
        {
          "x": "boat",
          "y": 14
        },
        {
          "x": "train",
          "y": 252
        },
        {
          "x": "subway",
          "y": 188
        },
        {
          "x": "bus",
          "y": 111
        },
        {
          "x": "car",
          "y": 117
        },
        {
          "x": "moto",
          "y": 133
        },
        {
          "x": "bicycle",
          "y": 246
        },
        {
          "x": "horse",
          "y": 44
        },
        {
          "x": "skateboard",
          "y": 120
        },
        {
          "x": "others",
          "y": 197
        }
      ]
    },
    {
      "id": "norway",
      "color": "hsl(209, 70%, 50%)",
      "data": [
        {
          "x": "plane",
          "y": 222
        },
        {
          "x": "helicopter",
          "y": 76
        },
        {
          "x": "boat",
          "y": 92
        },
        {
          "x": "train",
          "y": 270
        },
        {
          "x": "subway",
          "y": 88
        },
        {
          "x": "bus",
          "y": 23
        },
        {
          "x": "car",
          "y": 232
        },
        {
          "x": "moto",
          "y": 133
        },
        {
          "x": "bicycle",
          "y": 27
        },
        {
          "x": "horse",
          "y": 180
        },
        {
          "x": "skateboard",
          "y": 229
        },
        {
          "x": "others",
          "y": 215
        }
      ]
    }
  ]

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