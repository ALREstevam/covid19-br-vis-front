import React from 'react';
import { formatDate } from '../common/date'

const CityDataItem = ({ name, state, date, cases, deaths }) => {
    return (
        <div className='cityListItem'>
            <span style={styles.lastUpdate}>Última atualização {formatDate(date)}</span><br />
            <span style={styles.cityName}><b>{name}/{state}</b></span><br />
            <span style={styles.dataValue}><b>Casos:</b> {cases}</span><br />
            <span style={styles.dataValue}><b>Óbitos:</b> {deaths}</span>
        </div>)
};

const styles = {
    lastUpdate: {
        color: '#949494',
        fontSize: '.6em'
    },
    cityName: {
        fontSize: '1em'
    },
    dataValue: {
        color: '#3b3b3b',
        fontSize: '.9em'
    }
}

export default CityDataItem