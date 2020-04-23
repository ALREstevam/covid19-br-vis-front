import React, { Component } from 'react';
import { getCitiesBrJson } from '../requests/covid'
import MapBox from './MapBox'
//import MyResponsiveLine from './LogPlot'
import LoadingBar from 'react-top-loading-bar';

class MainPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            covidCasesGeoJson: undefined,
            covidCasesJson: undefined,
            loadingBarProgress: 0,
        }

        this.timers = []

    }

    clearIntervals() {
        for (let timer of this.timers) {
            clearInterval(timer)
        }
    }

    add(value) {
        this.setState({
            loadingBarProgress: this.state.loadingBarProgress + value
        })
    }

    complete = () => {
        this.setState({ loadingBarProgress: 100 })
        this.clearIntervals()
    }

    onLoaderFinished = () => {
        this.setState({ loadingBarProgress: 0 })
    }

    infiniteLoad = () => {
        this.setState({
            loadingBarProgress: this.state.loadingBarProgress + Math.round(5 + Math.random() * 5)
        })

        this.timers.push(setInterval(
            () => {
                this.setState({
                    loadingBarProgress: this.state.loadingBarProgress + Math.round(Math.random() * 5)
                })
            },
            800
        ))

    }



    render() {
        return (
            <div>
                <LoadingBar
                    progress={this.state.loadingBarProgress}
                    height={3}
                    color='red'
                    onLoaderFinished={() => this.onLoaderFinished()}
                />
                <MapBox style={{ right: 0, left: 0, height: '95vh', width: '100%' }}
                    data={this.state.covidCasesGeoJson}
                    zoom={3} lat={-13.5958} lng={-54.4587}
                    onSourceLoadBegin={this.infiniteLoad}
                    onSourceLoadFinished={() => { this.complete() }}
                />
                {/*<div style={{ width: '100%', height: '100vh', backgroundColor: 'red' }}>
                    <MyResponsiveLine />
                </div>*/}
            </div>
        );
    }

    componentDidMount() {
    }

    componentWillUnmount() {
        this.clearIntervals()
    }
}

export default MainPage;
