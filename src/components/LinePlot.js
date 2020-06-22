import React from 'react'
import { ResponsiveLine } from '@nivo/line'

function fixDecimalPlaces(num, decimalPlaces = 2) {
    if (typeof num === 'string' || num instanceof String) return num
    if (Number.isInteger(num)) return num.toString()
    else return Number(num).toFixed(decimalPlaces).toString()
}

function decimalOrDivisor(number, decimalPlaces=2){
    const num = Number(number)
    if(num > 1000)return num.toLocaleString('pt-br')
    else return fixDecimalPlaces(num, decimalPlaces)
}

function abbreviateNumber(num, fixed = 2) {
    if (num === null) { return null; } // terminate early
    if (num === 0) { return '0'; } // terminate early
    fixed = (!fixed || fixed < 0) ? 0 : fixed; // number of decimal places to show
    var b = (num).toPrecision(2).split("e"), // get power
        k = b.length === 1 ? 0 : Math.floor(Math.min(b[1].slice(1), 14) / 3), // floor at decimals, ceiling at trillions
        c = k < 1 ? num.toFixed(0 + fixed) : (num / Math.pow(10, k * 3)).toFixed(1 + fixed), // divide by power
        d = c < 0 ? c : Math.abs(c), // enforce -0 is 0
        e = d + ['', 'K', 'M', 'B', 'T'][k]; // append power
    return e;
}

function formatNumber(number, decimalPlaces=2){
    const num = Number(number)
    if(num > -20 && num < 20) return fixDecimalPlaces(num, decimalPlaces)
    else  return abbreviateNumber(num, decimalPlaces)
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

const showSometimes = showEvery(7)

const theme = {
    axis: {
        textColor: "#eee",
        fontSize: 10,
        tickColor: "#eee"
    },
    grid: {
        stroke: "#888",
        strokeWidth: 1
    },
    pointLabel: {
        textColor: "#eee",
        fontSize: 20
    },
    dots: {
        text: {
            fontSize: 10,
        },
    },

}

const scales = {
    linear: (stacked) => {
        return {
            type: 'linear', min: 0, max: 'auto', stacked: stacked, reverse: false
        }
    },
    linearZeroOne: (stacked) => {
        return {
            type: 'linear', min: 0, max: 1, stacked: stacked, reverse: false
        }
    },
    linearMinusOnePlusOne: (stacked) => {
        return {
            type: 'linear', min: -1, max: 1, stacked: stacked, reverse: false
        }
    },
    log10: (stacked) => {
        return {
            type: 'log', base: 10, max: 'auto', stacked: stacked, reverse: false
        }
    }
}

const Tootip = ({node, data}) => {
    let last = undefined
    let lasty = 0

    let index = Number.parseInt(node.point.id.split('.')[1])
    
    if (index > 0) {
        last = data.filter(data => data.id === node.point.serieId)[0].data[index - 1]
        lasty = last.y
    }

    let lastDiff = node.point.data.yFormatted - lasty
    let lastDiffStr = fixDecimalPlaces(lastDiff)
    lastDiffStr = lastDiff >= 0 ? `+${decimalOrDivisor(lastDiffStr)}` : `${decimalOrDivisor(lastDiffStr)}`

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
            <span>{node.point.serieId}: <strong>{decimalOrDivisor(node.point.data.yFormatted)}</strong>
                <br />
                <span> ({lastDiffStr})</span>
            </span>
        </div>
    )
}


const LinePLot = ({ data, colors = { scheme: 'set3' }, stacked = false, yScaleType = 'linear' }) => {
    return (<ResponsiveLine
        data={data}
        margin={{ top: 50, right: 120, bottom: 100, left: 90 }}
        tooltip={(node)=>(<Tootip node={node} data={data}/>)}
        xScale={{
            type: 'time', //point, time, linear
            //min: 0,
            //max: 'auto',
            format: "%Y-%m-%dT%H:%M:%S",
            //precision: "hour",
            //2020-02-25T00:00:00
        }}

        yScale={scales[yScaleType](stacked)}

        xFormat="time:%d/%m"
        /*yFormat={}*/

        theme={theme}
        curve="natural"
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
            legendPosition: 'middle',
            format: (n) => formatNumber(n, 2),
        }}
        colors={colors}
        pointSize={3}
        pointBorderWidth={3}
        pointColor={{ theme: 'background' }}
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