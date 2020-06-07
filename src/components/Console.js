import React from 'react'
import ReactList from 'react-list'
import { formatDate } from '../common/date'
import CityDataItem from './CityDataItem'

const Console = ({ daysAgo, date, value, cities, zoom, lat, lng,
    animated, onHeatmapChange, heatmapType, maxDays, onAnimatedChange,
    onSliderChange, onSliderRelease, hidden, onHiddenChange }) => {

    const renderCityListItem = (index, key) => {
        const data = cities[index]
        return (<CityDataItem name={data.city}
            state={data.state}
            date={new Date(data.date)}
            cases={data.totalCases} deaths={data.deaths} key={key} />)
    }

    return (
        <nav className='console' style={hidden ? { left: -182, } : { left: 0 }}>
            <link rel='stylesheet' type='text/css' href='https://cdnjs.cloudflare.com/ajax/libs/foundation/6.5.1/css/foundation-float.min.css' />

            <div onClick={() => onHiddenChange(!hidden)} className='hideConsoleButton'
                style={hidden ? { fontSize: 20 } : { fontSize: 12 }}
            >
                <span>{hidden ? '▶' : '◀'}</span>
            </div>

            <h1 className='consoleTitle'>COVID-19 no Brasil</h1>
            <label>
                <span style={{ fontSize: '1.1em' }}> Até o dia <strong>
                    {formatDate(date)}</strong> {daysAgo}</span>
                <input
                    className='sliderDate'
                    type='range'
                    min='0'
                    max={maxDays}
                    step='1'
                    value={value}
                    onChange={(e) => onSliderChange(e.target.value)}
                    onMouseUp={(e) => onSliderRelease(e.target.value)} />
            </label>
            <form>
                <label>
                    <input
                        name="animate"
                        type="checkbox"
                        checked={animated}
                        onChange={onAnimatedChange} />
                    Animar
                        </label>
            </form>

            <form style={{ display: 'flex', justifyContent: 'space-around' }}>
                <label style={{ lineHeight: '19px' }}>
                    <input type="radio" value="infected"
                        style={{ marginBottom: '3px' }}
                        checked={heatmapType === 'infected'}
                        onChange={(e) => onHeatmapChange(e)} />
                    Casos
                       </label>
                <label style={{ lineHeight: '19px' }}>
                    <input type="radio" value="death"
                        style={{ marginBottom: '3px' }}
                        checked={heatmapType === 'death'}
                        onChange={(e) => onHeatmapChange(e)} />
                    Óbitos
                      </label>
            </form>
            <div>

            </div>
            <div className='cityList'>
                {(cities.length > 0) ? (<ReactList
                    itemRenderer={/*::*/renderCityListItem}
                    length={cities.length}
                    type='uniform'
                    pageSize={3}
                />)
                    :
                    (<p style={{ textAlign: 'center', fontStyle: 'italic' }}>
                        (Use o zoom e a navegação pelo mapa para ver os detalhes de cada localidade.)</p>)}
            </div>
            {/*
            <div style={{ color: 'gray', fontSize: '0.5em', bottom: 0, position: 'absolute' }}>
                <p>
                    <span><strong>Zoom: </strong>{zoom}</span>
                    <span> | </span>
                    <span><strong>Centro: </strong>{lat}, {lng}</span>
                </p>
            </div>
            */}
        </nav>
    )
}

export default Console