import React, { Component } from 'react';
//import { getCitiesBrJson } from '../requests/covid'
import MapBox from './MapBox'
//import MyResponsiveLine from './LogPlot'
import LoadingBar from 'react-top-loading-bar';
import Footer from './Footer'
import LinePlot from './LinePlot'
import HorizontalBarPlot from './HorizontalBarPlot'
import MapDataExtractor from '../common/MapDataExtractor'
import texts from '../texts/texts'
import ChartTabs from './Tabs'

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
    stacked = true, className = 'almostFullPage', yScaleType = 'linear' }) => {

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

const HorizontalBarPlotWrapper = ({ title, data, keys, index, xTitle, yTitle, className='onePageAndaHalfSize'}) => {
    return (
        <div>
            <h3>{title}</h3>
            <div className={className}>
                <HorizontalBarPlot 
                data={data}
                keys={keys} index={index}
                xTitle={xTitle}
                yTitle={yTitle}/>
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

        this.tabs = {
            '(🛈) Sobre': {
                onOpened: () => { }
            },
            '(Σ) Acumulado': {
                onOpened: () => {
                    this.updateDatasetIfNeeded()
                    this.setState({
                        deaths: this.plotData.generateDeathsPlotData(),
                        cases: this.plotData.generateCasesPlotData(),
                    })
                }
            },
            '(📅) Diário': {
                onOpened: () => {
                    this.updateDatasetIfNeeded()
                    this.setState({
                        newCases: this.plotData.generateNewCasesPlotData(),
                        newDeaths: this.plotData.generateNewDeathsPlotData(),
                    })
                }
            },
            '(📈) Taxa de crescimento': {
                onOpened: () => {
                    this.updateDatasetIfNeeded()
                    this.setState({
                        deaths: this.plotData.generateDeathsPlotData(),
                        cases: this.plotData.generateCasesPlotData(),
                        casesGrowthFactor: this.plotData.generateCasesGrowthFactorPlotData(),
                        deathGrowthFactor: this.plotData.generateDeathsGrowthFactorPlotData(),
                        deathsOverCases: this.plotData.generateDeathsOverCases(),
                    })
                }
            },
            '(📊) Totais por cidade e estado': {
                onOpened: () => {
                    this.updateDatasetIfNeeded()
                    this.setState({
                        deaths: this.plotData.generateDeathsPlotData(),
                        cases: this.plotData.generateCasesPlotData(),
                        casesDeathsPerLocation: this.plotData.generateCasesDeathsPerStateAndCity(15),
                    }, ()=>{
                        console.log(this.state.casesDeathsPerLocation)
                    })
                }
            },
        }

        this.tabTitles = Object.keys(this.tabs)

        this.state = {
            covidCasesGeoJson: undefined,
            covidCasesJson: undefined,
            loadingBarProgress: 0,
            //visibleCities: [],
            visibleCitiesPerDate: {},
            selectedDate: new Date(),
            perDateChartName: 'COVID-19 em todo o Brasil...',
            scheduleUpdate: true,
            currentTab: this.tabTitles[0],

            deaths: this.plotData.generateDeathsPlotData(),
            cases: this.plotData.generateCasesPlotData(),
            casesGrowthFactor: this.plotData.generateCasesGrowthFactorPlotData(),
            deathGrowthFactor: this.plotData.generateDeathsGrowthFactorPlotData(),
            deathsOverCases: this.plotData.generateDeathsOverCases(),
            newCases: this.plotData.generateNewCasesPlotData(),
            newDeaths: this.plotData.generateNewDeathsPlotData(),
            casesDeathsPerLocation: this.plotData.generateCasesDeathsPerStateAndCity(),
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

    updateDatasetIfNeeded = () => {
        if (this.state.scheduleUpdate) {
            this.plotData.makeDataset(this.state.visibleCitiesPerDate, this.state.selectedDate)
            this.setState({ scheduleUpdate: false })
        }
    }

    handlePlotDataChanged = (visibleCities, visibleCitiesPerDate) => {
        this.setState({
            //visibleCities: visibleCities,
            visibleCitiesPerDate: visibleCitiesPerDate,
            perDateChartName: this.plotData.makeTitle(),
            scheduleUpdate: true,
        }, ()=>{
            this.tabs[this.state.currentTab].onOpened()
        })
    }

    handlePlotDateChanged = (date) => {
        this.setState({
            selectedDate: date,
            perDateChartName: this.plotData.makeTitle(),
            scheduleUpdate: true,
        }, ()=>{
            this.tabs[this.state.currentTab].onOpened()
        })
    }

    onMapUpdatingHandler = (isLoading) => {
        this.setState({ loading: isLoading })
    }

    onTabChangedHandler = (index, title) => {
        this.tabs[title].onOpened()
        this.setState({currentTab: title})
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
                    onVisibleCitiesChange={this.handlePlotDataChanged}
                    onSelectedDateChanged={this.handlePlotDateChanged}
                />

                <ChartTabs
                    tabTitles={this.tabTitles}
                    selectedIndex={0}
                    onSelectedChanged={this.onTabChangedHandler}
                    renderIfSelectedOnly={false}
                >

                    <div>
                        <h1>{this.state.perDateChartName}</h1>
                        {texts.aboutSite.presentation}
                        {texts.aboutSite.youCanDo}
                    </div>

                    <div>
                        <h1>{this.state.perDateChartName}</h1>
                        <LinePlotWrapper title='Casos e óbitos'
                            data={[this.state.deaths, this.state.cases]}
                            colors={['#fa4343', '#0068d2']}
                            stacked={true} />

                        <LinePlotWrapper title='Óbitos' data={[this.state.deaths]}
                            colors={['#fa4343']}
                        />

                        <LinePlotWrapper title='Casos e óbitos em escala logarítmica'
                            data={[this.plotData.removeZeroes(this.state.deaths),
                            this.plotData.removeZeroes(this.state.cases)]}
                            colors={['#fa4343', '#0068d2']}
                            stacked={true}
                            yScaleType='log10' />
                    </div>

                    <div>
                        <h1>{this.state.perDateChartName}</h1>

                        <h2>Novos casos e óbitos</h2>

                        <LinePlotWrapper
                            title='Novos casos por dia'
                            data={[this.state.newCases]}
                            colors={['#3841e8']}
                        />

                        <LinePlotWrapper
                            title='Novos óbitos por dia'
                            data={[this.state.newDeaths]}
                            colors={['#e85e38']}
                        />

                        <h2>Novos casos e óbitos - escala logarítmica</h2>

                        <LinePlotWrapper title='Casos e óbitos em escala logarítmica'
                            data={[
                                this.plotData.removeZeroes(this.state.newDeaths),
                                this.plotData.removeZeroes(this.state.newCases)]}
                            colors={['#fa4343', '#0068d2']}
                            stacked={true}
                            yScaleType='log10' />

                    </div>

                    <div>
                        <h1>{this.state.perDateChartName}</h1>
                        <LinePlotWrapper
                            title='Casos sobre óbitos'
                            data={[this.state.deathsOverCases]}
                            colors={['#e8a838']}
                        />

                        <h2>Fator de crescimento</h2>

                        {texts.growthFactor.mainExplanation}
                        {texts.growthFactor.parameters}
                        {texts.growthFactor.about}

                        <LinePlotWrapper title='Fator de crescimento - casos'
                            data={[this.state.casesGrowthFactor]}
                            colors={['#00d3eb']}
                        />

                        <LinePlotWrapper title='Fator de crescimento - óbitos' data={
                            [this.state.deathGrowthFactor]}
                            colors={['#ff6a7f']}
                        />

                        <LinePlotWrapper title='Fator de crescimento - casos e óbitos' data={
                            [this.state.casesGrowthFactor, this.state.deathGrowthFactor]}
                            colors={['#ff6a7f', '#00d3eb']}
                            yScaleType='linearMinusOnePlusOne'
                        />
                    </div>

                    <div>
                        <h1>{this.state.perDateChartName}</h1>
                        
                        {texts.perLocation.explainMax(15, 15)}

                        <HorizontalBarPlotWrapper 
                            title='Totais por estado' 
                            data={this.state.casesDeathsPerLocation.states.data}
                            keys={this.state.casesDeathsPerLocation.states.keys}
                            index={this.state.casesDeathsPerLocation.states.index}
                            xTitle="Pessoas"
                            yTitle="Estado"
                        />
                        <HorizontalBarPlotWrapper 
                            title='Totais por cidade' 
                            data={this.state.casesDeathsPerLocation.cities.data}
                            keys={this.state.casesDeathsPerLocation.cities.keys}
                            index={this.state.casesDeathsPerLocation.cities.index}
                            xTitle="Pessoas"
                            yTitle="Cidade"
                        />
                    </div>

                </ChartTabs>

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

        this.updateDatasetIfNeeded()

    }

    componentWillUnmount() {
        this.clearIntervals()
    }
}

export default MainPage;
