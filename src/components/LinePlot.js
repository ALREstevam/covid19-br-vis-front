import React from 'react'
import { ResponsiveLine } from '@nivo/line'


function formatNumber(num, decimalPlaces = 2) {
    if (typeof num === 'string' || num instanceof String) {
        return num
    }
    if (Number.isInteger(num)) {
        return num.toString()
    }
    else {
        return Number(num).toFixed(decimalPlaces).toString()
    }
}

function showEvery(n) {
    let current = 0
    return (value) => {
        current += 1
        if (current % n === 0) {
            current = 0
            return value
        } else {
            return ''
        }
    }
}

const showSometimes = showEvery(3)


const LinePLot = ({ data, colors = { scheme: 'set3' }, stacked = false }) => {
    return (<ResponsiveLine
        data={data}
        margin={{ top: 50, right: 60, bottom: 100, left: 60 }}
        tooltip={(node) => {
            let last = undefined
            let lasty = 0

            let index = Number.parseInt(node.point.id.split('.')[1])
            if(index > 0){
                last = data.filter(data => data.id === node.point.serieId)[0].data[index-1]
                lasty = last.y
            }
            
            let lastDiff = node.point.data.yFormatted - lasty
            let lastDiffStr = formatNumber(lastDiff)
            lastDiffStr = lastDiff >= 0 ? `+${lastDiffStr}` : `${lastDiffStr}`   
            

            return (
                <div style={{
                    color: node.point.serieColor,
                    backgroundColor: '#fff',
                    padding: '5px',
                    border: `1px solid ${node.point.borderColor}`,
                    textAlign: 'center',
                    borderRadius: '5px',
                    boxShadow: '5px 5px 10px -7px rgba(0,0,0,0.75)'
                }}>
                    <strong style={{ fontSize: '.9em' }}>{node.point.data.xFormatted}</strong><br />
                    <span>{node.point.serieId}: <strong>{node.point.data.yFormatted}</strong>
                    <span> ({lastDiffStr})</span>
                    </span>
                </div>
            )
        }}
        xScale={{
            type: 'time', //point, time, linear
            //min: 0,
            //max: 'auto',
            format: "%Y-%m-%dT%H:%M:%S",
            //precision: "hour",
            //2020-02-25T00:00:00
        }}
        xFormat="time:%m/%d"
        yFormat={formatNumber}
        curve="natural"
        yScale={{ type: 'linear', min: 0, max: 'auto', stacked: stacked, reverse: false }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            orient: 'bottom',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Tempo',
            legendOffset: 36,
            legendPosition: 'middle',
            format: '%d/%m',
        }}
        axisLeft={{
            legend: 'Pessoas',
            orient: 'left',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legendOffset: -40,
            legendPosition: 'middle'
        }}
        colors={colors}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        enablePointLabel={true}
        pointLabel={e => showSometimes(formatNumber(e.y, 4))}
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
            {
                anchor: 'bottom-left',
                direction: 'row',
                justify: false,
                translateX: 0,
                translateY: 90,
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
    />)
}


export default LinePLot