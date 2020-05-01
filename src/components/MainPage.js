import React, { Component } from 'react';
//import { getCitiesBrJson } from '../requests/covid'
import MapBox from './MapBox'
//import MyResponsiveLine from './LogPlot'
import LoadingBar from 'react-top-loading-bar';
import Footer from './Footer'
import LinePlot from './LinePlot'
import { perDate2NivoDataset, perDate2NivoChartTitle } from '../common/toNivoDataConverter'

const GrowthFactorMessage = () => (

    <div className='nivoCharts'>
        <h3>Fator de crescimento</h3>
        <p>
            O <strong>Fator de Crescimento</strong> (ou <em>Growth Factor</em>) é calculado pela divisão <code>ValorDia/ValorDiaAnterior</code> e reflete
            o crescimento diário no número de casos e óbitos computados:
                        </p>

        <ul>
            <li><code>Fator de Crescimento<strong> &gt; </strong>0</code>: o valor referido aumentou desde o último dia</li>
            <li><code>Fator de Crescimento<strong> &lt; </strong>0</code>: o valor referido diminuiu desde o último dia</li>
            <li><code>Fator de Crescimento<strong> ≈ </strong>0</code>: o valor referido não mudou significativamente desde o último dia</li>
        </ul>

        <p>
            O fator de crescimento é uma importante métrica na avaliação da disseminação da doença e ocorrência de mortes, mas
            é totalmente dependente da testagem em massa da população e da confirmação da causa dos óbitos onde há suspeita de COVID-19,
            assim, um aumento ou diminuição neste fator pode ocorrer caso a quantidade de testes realizados mude e não somente
            se a quantidade de pessoas infectadas ou óbitos confirmados se alterar.
                    </p>
    </div>
)

class MainPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            covidCasesGeoJson: undefined,
            covidCasesJson: undefined,
            loadingBarProgress: 0,
            visibleCities: [],
            visibleCitiesPerDate: {},
            selectedDate: new Date(),
            perDayChartData: perDate2NivoDataset({}),
            perDateChartName: 'COVID-19 em todo o Brasil'
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

    onMapLoadedHandler = () => {
        this.complete()
        this.updatePlots()
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

    visibleCitiesChangeHandler = async (visibleCities, visibleCitiesPerDate) => {
        this.setState({
            visibleCities: visibleCities,
            visibleCitiesPerDate: visibleCitiesPerDate,
        })
        this.updatePlots()
    }

    updatePlots = async () => {
        this.setState({
            perDayChartData: perDate2NivoDataset(this.state.visibleCitiesPerDate),
            perDateChartName: 'COVID-19 em ' + perDate2NivoChartTitle(this.state.visibleCitiesPerDate, "todo o Brasil")
        })
    }

    selectedDateChangedHandler = (date) => {
        this.setState({ selectedDate: date })
    }



    render() {
        return (
            <div>
                <LoadingBar
                    progress={this.state.loadingBarProgress}
                    height={3}
                    color='red'
                    onLoaderFinished={this.onLoaderFinished}
                />
                <MapBox style={{ right: 0, left: 0, height: '95vh', width: '100%' }}
                    data={this.state.covidCasesGeoJson}
                    zoom={3} lat={-13.5958} lng={-54.4587}
                    onSourceLoadBegin={this.infiniteLoad}
                    onSourceLoadFinished={this.onMapLoadedHandler}
                    onVisibleCitiesChange={this.visibleCitiesChangeHandler}
                    onSelectedDateChanged={this.selectedDateChangedHandler}
                />
                <div className='nivoCharts'>
                    <h2>{this.state.perDateChartName}</h2>
                    <h3>Casos e óbitos</h3>
                    <div style={{ width: '100%', height: '100vh' }}>
                        <LinePlot
                            data={[this.state.perDayChartData.deaths, this.state.perDayChartData.cases]}
                            colors={['#fa4343', '#0068d2']} 
                            stacked={true}/>
                    </div>
                    <h3>Óbitos</h3>
                    <div style={{ width: '100%', height: '50vh', }}>
                        <LinePlot data={[this.state.perDayChartData.deaths]} 
                            colors={['#fa4343']} />
                    </div>

                    <GrowthFactorMessage />

                    <div style={{ width: '100%', height: '80vh', }}>
                        <LinePlot data={[this.state.perDayChartData.casesGrowthFactor]}
                        colors={['#00d3eb']}/>
                    </div>
                    <div style={{ width: '100%', height: '80vh', }}>
                        <LinePlot data={[this.state.perDayChartData.deathGrowthFactor]} 
                        colors={['#ff6a7f']}/>
                    </div>
                    {/*<div style={{ width: '100%', height: '100vh', backgroundColor: 'red' }}>
                    <MyResponsiveLine />
                </div>*/}
                </div>
                <Footer />
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
