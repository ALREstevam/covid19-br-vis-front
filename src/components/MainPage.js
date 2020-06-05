import React, { Component } from 'react';
//import { getCitiesBrJson } from '../requests/covid'
import MapBox from './MapBox'
//import MyResponsiveLine from './LogPlot'
import LoadingBar from 'react-top-loading-bar';
import Footer from './Footer'
import LinePlot from './LinePlot'
import BarPlot from './BarPlot'
import MapDataExtractor from '../common/MapDataExtractor'
import texts from '../texts/texts'

//import WebWorker from '../worker/WebWorkerSetup'
//import visibleCitiesWorker from '../worker/visibleCitiesWorker'


const currentScrollPosition = () => {
    return (window.pageYOffset || document.documentElement.scrollTop)
}

const scrollTo = (pos) => {
    document.documentElement.scrollTop = document.body.scrollTop = pos
}

const scrollOffset = (offset) => {
    scrollTo(currentScrollPosition() + offset)
}


const ScrollButtons = () => (
    <div className='scrollButtons'>
        <div className='scrollButton' onClick={() => { scrollOffset(-500) }}><span>{texts.specialChars.pointUp}</span></div>
        <div className='scrollButton' onClick={() => { scrollOffset(500) }}><span>{texts.specialChars.pointDown}</span></div>
    </div>
)

const LinePlotWrapper = ({ title, data, colors,
    stacked = true, className = 'almostFullPage',
    yScaleType = 'linear' }) => {

    if (data === undefined) {
        console.error('LinePlotWrapper received undefined as data to plot', title)
        return (undefined)
    }

    return (
        <div>
            <h3>{title}</h3>
            <div className={className}>
                <LinePlot data={data}
                    colors={colors}
                    stacked={stacked}
                    yScaleType={yScaleType} />
            </div>
        </div>
    )
}

const BarPlotWrapper = ({title, data, className}) => {
    return (
        <div>
            <h3>{title}</h3>
            <div className={className}>
                <BarPlot data={data} />
            </div>
        </div>
        
    )
}



class MainPage extends Component {
    constructor(props) {
        super(props)

        this.timers = []
        this.plotData = new MapDataExtractor()
        this.plotData.makeDataset({}, new Date())

        this.state = {
            covidCasesGeoJson: undefined,
            covidCasesJson: undefined,
            loadingBarProgress: 0,
            //visibleCities: [],
            visibleCitiesPerDate: {},
            selectedDate: new Date(),
            perDayChartData: this.plotData.generateChartData(),
            perDateChartName: 'COVID-19 em todo o Brasil...'
        }
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
        //this.worker.postMessage('SOMETHING');
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
            }, 1200)
        )
    }

    updatePlots = (visibleCities, visibleCitiesPerDate) => {
        this.plotData.makeDataset(visibleCitiesPerDate, this.state.selectedDate)

        this.setState({
            //visibleCities: visibleCities,
            visibleCitiesPerDate: visibleCitiesPerDate,
            perDayChartData: this.plotData.generateChartData(),
            perDateChartName: this.plotData.makeTitle()
        })
    }

    selectedDateChangedHandler = (date) => {
        this.plotData.makeDataset(this.state.visibleCitiesPerDate, date)
        this.setState({
            selectedDate: date,
            perDayChartData: this.plotData.generateChartData(),
            perDateChartName: this.plotData.makeTitle()
        })
    }

    onMapUpdatingHandler = (isLoading) => {
        this.setState({ loading: isLoading })
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
                <ScrollButtons />

                <MapBox style={{ right: 0, left: 0, height: '95vh', width: '100%', maxHeight: '1000px' }}
                    data={this.state.covidCasesGeoJson}
                    zoom={3} lat={-13.5958} lng={-54.4587}
                    onSourceLoadBegin={this.infiniteLoad}
                    onSourceLoadFinished={this.onMapLoadedHandler}
                    onVisibleCitiesChange={this.updatePlots}
                    onSelectedDateChanged={this.selectedDateChangedHandler}
                />

                <div className='nivoCharts'>
                    <h2>{this.state.perDateChartName}</h2>

                    {texts.aboutSite.presentation}
                    {texts.aboutSite.youCanDo}

                    <LinePlotWrapper title='Casos e óbitos'
                        data={[this.state.perDayChartData.deaths, this.state.perDayChartData.cases]}
                        colors={['#fa4343', '#0068d2']}
                        stacked={true} />

                    <LinePlotWrapper title='Óbitos' data={[this.state.perDayChartData.deaths]}
                        colors={['#fa4343']}
                    />

                    <LinePlotWrapper title='Casos e óbitos em escala logarítmica'
                        data={[this.plotData.removeZeroes(this.state.perDayChartData.deaths),
                        this.plotData.removeZeroes(this.state.perDayChartData.cases)]}
                        colors={['#fa4343', '#0068d2']}
                        stacked={true}
                        yScaleType='log10' />

                    <LinePlotWrapper
                        title='Casos sobre óbitos'
                        data={[this.state.perDayChartData.deathsOverCases]}
                        colors={['#e8a838']}
                    />

                    {/*<BarPlotWrapper
                            title='Totais'
                            data={this.state.perDayChartData.casesDeathsPerLocation.perState}
                    />*/}

                    <h2>Novos casos e óbitos</h2>

                    <LinePlotWrapper
                        title='Novos casos por dia'
                        data={[this.state.perDayChartData.newCases]}
                        colors={['#3841e8']}
                    />

                    <LinePlotWrapper
                        title='Novos óbitos por dia'
                        data={[this.state.perDayChartData.newDeaths]}
                        colors={['#e85e38']}
                    />

                    <h2>Fator de crescimento</h2>

                    {texts.growthFactor.mainExplanation}
                    {texts.growthFactor.parameters}
                    {texts.growthFactor.about}

                    <LinePlotWrapper title='Fator de crescimento - casos' data={[this.plotData.casesGrowthFactorPlotData]}
                        colors={['#00d3eb']}
                    />

                    <LinePlotWrapper title='Fator de crescimento - óbitos' data={[this.plotData.deathsGrowthRateData]}
                        colors={['#ff6a7f']}
                    />

                    <LinePlotWrapper title='Fator de crescimento - casos e óbitos' data={[this.plotData.deathsGrowthRateData, this.plotData.casesGrowthFactorPlotData]}
                        colors={['#ff6a7f', '#00d3eb']}
                        yScaleType='linearMinusOnePlusOne'
                    />

                </div>
                <div style={{ marginLeft: 50, marginRight: 50 }}>
                    <hr />
                    {texts.dataSource.mainText}
                </div>
                <Footer />
            </div>
        );
    }

    componentDidMount() {
        //this.worker = new WebWorker(visibleCitiesWorker)

        /*this.worker.addEventListener('message', function(e) {
            console.log('Message from Worker: ' + e.data)
        })*/

    }

    componentWillUnmount() {
        this.clearIntervals()
    }
}

export default MainPage;
