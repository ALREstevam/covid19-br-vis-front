import React, { Component } from 'react';
import { getCitiesBrJson } from '../requests/covid'
import MapBox from './MapBox'
import MyResponsiveLine from './LogPlot'

class MainPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            covidCasesGeoJson: undefined,
            covidCasesJson: undefined,
        }
    }

    render() {
        return (
            <div>
                <MapBox style={{ right: 0, left: 0, height:'95vh', width: '100%'}}
                    data={this.state.covidCasesGeoJson}
                    zoom={3} lat={-13.5958} lng={-54.4587}/>
                {/*<div style={{ width: '100%', height: '100vh', backgroundColor: 'red' }}>
                    <MyResponsiveLine />
                </div>*/}
            </div>
        );
    }

    componentDidMount() {
        getCitiesBrJson(
            (data) => {
                this.setState({ covidCasesJson: data })
            },
            console.error,
        )
    }
}

export default MainPage;
