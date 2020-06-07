import React from 'react'
import BarPlot from './BarPlot'

const HorizontalBarPlot = ({ data, keys, index, xTitle, yTitle }) => (
    <BarPlot
        data={data}
        keys={keys}
        index={index}
        xTitle={xTitle}
        yTitle={yTitle}
        groupMode='grouped'
        layout='horizontal'
        colors={['#F47560', '#61CDBB']}
    />
)

export default HorizontalBarPlot