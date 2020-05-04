import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl'
import ReactList from 'react-list'
import { formatDate, daysBetween, addDays } from '../common/date'
import CityDataItem from './CityDataItem'
import env from '../env/envVars'
//import Lock from './Lock'
import {NotificationManager} from 'react-notifications';

mapboxgl.accessToken = env.MAPBOX_ACCESS_TOKEN

class MapBox extends Component {
    constructor(props) {
        super(props);

        let initialDate = new Date('2020-02-25')

        this.baseUrl = env.BACKEND_URL

        this.onSourceLoadBegin = this.props.onSourceLoadBegin
        this.onSourceLoadFinished = this.props.onSourceLoadFinished

        this.state = {
            lng: props.lng || 5,
            lat: props.lat || 34,
            zoom: props.zoom || 2,
            date: new Date(),
            sliderValue: daysBetween(new Date('2020-02-25'), new Date()),
            data: this.props.data,
            visibleCities: [],
            renderableCities: [],
            animate: false,
            initialDate: initialDate,
            maxDays: daysBetween(initialDate, new Date()),
            mapType: 'infected',
            loadState: 'loading',
            isMapInteractive: true,
        };
    }


    renderCityListItem = (index, key) => {
        const data = this.state.renderableCities[index]
        return <CityDataItem name={data.city} state={data.state} date={new Date(data.date)} 
        cases={data.totalCases} deaths={data.deaths} key={key}/>
    }

    getVisibleOnMap() {
        let features = this.state.map.queryRenderedFeatures({ layers: ['all-cities'] });
        let cityData = {}
        let perDate = {}
        if (features) {
            features = features.sort((a, b) => new Date(a.date) - new Date(b.date))
                .map(feature => feature.properties)

            for (let feature of features) {
                let city = feature.city
                if (!perDate.hasOwnProperty(feature.date)) perDate[feature.date] = []
                if (!cityData.hasOwnProperty(city) && feature.timestamp <= this.state.date.getTime()) cityData[city] = feature
                perDate[feature.date].push(feature)
            }
            return [Object.keys(cityData).map(key => cityData[key]), perDate];
        }
        return [[], []]
    }

    updateVisibleCities() {
        let cityData, perDate
        [cityData, perDate] = this.getVisibleOnMap()

        this.setState({
            visibleCities: cityData,
            visibleCitiesPerDate: perDate,
            renderableCities: cityData.sort((a, b) => a.totalCases - b.totalCases).reverse()
        })

        this.props.onVisibleCitiesChange &&
            this.state.loadState === 'loaded' &&
            this.props.onVisibleCitiesChange(cityData, perDate)
    }

    animatedStep() {
        if (this.state.animate) {
            this.setInteractive(false)
            NotificationManager.info("A interação com o mapa será desetivada enquanto a animação ocorrer.", "Animação ativada")
            
            if (this.state.sliderValue >= this.state.maxDays) {
                this.changeSlider(0)
                this.onSliderChangeEndedAsync(0)
            }

            this.animateTimeout = setInterval(() => {
                if (this.state.sliderValue <= this.state.maxDays) {
                    this.changeSlider(this.state.sliderValue + 1)
                    this.onSliderChangeEndedAsync(this.state.sliderValue + 1)
                }
                else {
                    this.changeSlider(0)
                    this.onSliderChangeEndedAsync(0)
                }
            }, 4000);
        }
        else if (this.animateTimeout) {
            this.state.loadState === 'loaded' && this.setInteractive(true)
            clearInterval(this.animateTimeout);
        }

    }

    changeSlider(value) {
        let dayNum = parseInt(value)
        let newDate = addDays(this.state.initialDate, dayNum)

        this.setState({
            sliderValue: dayNum,
            date: newDate,
        })
    }

    onSliderChangeEndedAsync = async (value) => {
        let date = addDays(this.state.initialDate, parseInt(value))
        this.state.map.setFilter('covid-heatmap', ['<=', ['number', ['get', 'timestamp']], date.getTime()])
        this.state.map.setFilter('covid-heatmap-death', ['<=', ['number', ['get', 'timestamp']], date.getTime()])
        this.state.map.setFilter('covid-point', ['==', ['number', ['get', 'timestamp']], date.getTime()])
        this.updateVisibleCities()
        this.props.onSelectedDateChanged && this.props.onSelectedDateChanged(date)
    }

    handleMapTypeChange(event) {
        this.setState({
            mapType: event.target.value
        })

        let layers = {
            death: 'covid-heatmap-death',
            infected: 'covid-heatmap'
        }

        if (event.target.value === 'infected') {
            this.state.map.setLayoutProperty(layers.infected, 'visibility', 'visible')
            this.state.map.setLayoutProperty(layers.death, 'visibility', 'none')
        } else {
            this.state.map.setLayoutProperty(layers.infected, 'visibility', 'none')
            this.state.map.setLayoutProperty(layers.death, 'visibility', 'visible')
        }
    }

    handleAnimateChange = (event) => {
        this.setState({ animate: event.target.checked }, () => {
            this.animatedStep()
        })
    }

    render() {
        const daysAgo = () => {
            let daysAgo = daysBetween(this.state.date, new Date())
            if (daysAgo === 0) {
                return <span>(hoje)</span>
            }
            if (daysAgo === 1) {
                return (<span>(ontem)</span>)
            }
            else {
                return (<span>(há <strong>{daysAgo}</strong> dias)</span>)
            }
        }

        return (
            <div style={this.props.containerStyle}>
                <div className='console'>
                    <h1 className='consoleTitle'>Mapa de calor: COVID-19 no Brasil</h1>
                    <div className='session sliderbar'>
                        <label>
                            <span style={{fontSize: '1.1em'}}> Até o dia <strong>{formatDate(this.state.date)}</strong> {daysAgo()}</span>
                            <input className='slider row' type='range' min='0' max={this.state.maxDays} step='1' value={this.state.sliderValue} 
                            onChange={(e) => this.changeSlider(e.target.value)} 
                            onMouseUp={(e)=>this.onSliderChangeEndedAsync(e.target.value)}/>
                        </label>
                        <form>
                            <label>
                                <input name="animate" type="checkbox" checked={this.state.animate} onChange={this.handleAnimateChange} />
                                Animar
                        </label>
                        </form>
                    </div>
                    <form>
                        <label>
                            <input type="radio" value="infected" checked={this.state.mapType === 'infected'}
                                onChange={(e) => this.handleMapTypeChange(e)} />
                            Casos
                       </label>
                        <span> | </span>
                        <label>
                            <input type="radio" value="death" checked={this.state.mapType === 'death'}
                                onChange={(e) => this.handleMapTypeChange(e)} />
                            Óbitos
                      </label>
                    </form>
                    <div>

                    </div>
                    <div>
                        <div className='cityList'>
                            {(this.state.renderableCities.length > 0) ? (<ReactList
                                itemRenderer={/*::*/this.renderCityListItem}
                                length={this.state.renderableCities.length}
                                type='uniform'
                                pageSize={3}
                            />)
                                :
                                (<p style={{ textAlign: 'center', fontStyle: 'italic' }}>
                                    (Use o zoom e a navegação pelo mapa para ver os detalhes de cada localidade.)</p>)}
                        </div>
                    </div>
                    <div style={{ color: 'gray', fontSize: '0.5em', bottom: 0, position: 'absolute' }}>
                        <p>
                            <span><strong>Zoom: </strong>{this.state.zoom}</span>
                            <span> | </span>
                            <span><strong>Centro: </strong>{this.state.lat}, {this.state.lng}</span>
                            <span> | </span>
                            <span><strong>Cidades visíveis: </strong>{this.state.visibleCities.length}</span>
                        </p>
                    </div>
                </div>
                {/*<div style={{position: 'absolute', top: 10, right:10, zIndex: 999}}>
                    <Lock title='lock' textOnLocked="locked" textOnUnlocked='unlocked' locked={this.state.isMapInteractive}/>
                </div>*/}
                <div style={this.props.style} ref={el => this.mapContainer = el} />
            </div>
        )
    }

    setInteractive(isInteractive, mapObj) {
        let map = mapObj || this.state.map
        if (isInteractive) {
            map.boxZoom.enable();
            map.scrollZoom.enable();
            map.dragPan.enable();
            map.dragRotate.enable();
            map.keyboard.enable();
            map.doubleClickZoom.enable();
            map.touchZoomRotate.enable();
        } else {
            map.boxZoom.disable();
            map.scrollZoom.disable();
            map.dragPan.disable();
            map.dragRotate.disable();
            map.keyboard.disable();
            map.doubleClickZoom.disable();
            map.touchZoomRotate.disable();
        }
        this.setState({
            isMapInteractive: isInteractive
        })
    }

    componentDidMount() {
        this.onSourceLoadBegin && this.onSourceLoadBegin()

        const map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/aest/ck93dlpxn00v21imgp8zz3y6x?optimize=true',
            center: [this.state.lng, this.state.lat],
            zoom: this.state.zoom,
            minPitch: 0,
            maxPitch: 0,
            pitchWithRotate: false,
            logoPosition: 'bottom-right',
        })

        this.setState({
            map: map
        })

        this.setInteractive(false, map)

        map.on('move', () => {
            this.setState({
                lng: map.getCenter().lng.toFixed(4),
                lat: map.getCenter().lat.toFixed(4),
                zoom: map.getZoom().toFixed(2)
            });
        });

        map.on('load', () => {

            map.addSource('covid', {
                'type': 'geojson',
                'data': `${this.baseUrl}/api/v1/br/cities.geojson`
            })

            map.addSource('covid-cities-daily', {
                'type': 'geojson',
                'data': `${this.baseUrl}/api/v1/br/cities-daily.geojson`
            })

            map.on('moveend', () => {
                this.updateVisibleCities()
            });

            map.addLayer({
                'id': 'covid-heatmap-death',
                'type': 'heatmap',
                'source': 'covid',
                'visibility': 'none',
                'paint': {
                    // Increase the heatmap weight based on frequency and property magnitude
                    'heatmap-weight': [
                        'interpolate', ['linear'], ['number', ['get', 'newDeaths']], 0, 0, 20, 1
                    ],
                    // Increase the heatmap color weight weight by zoom level
                    // heatmap-intensity is a multiplier on top of heatmap-weight
                    'heatmap-intensity': [
                        'interpolate', ['linear'], ['zoom'], 0, 1, 9, 3
                    ],
                    // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
                    // Begin color ramp at 0-stop with a 0-transparancy color
                    // to create a blur-like effect.
                    'heatmap-color': [
                        'interpolate', ['linear'], ['heatmap-density'],
                        0, 'rgba(255,237,68,0)',
                        0.1, '#E75151',
                        0.2, '#D34848',
                        0.3, '#BF3F3F',
                        0.4, '#972D2D',
                        0.5, '#9e001f',
                        0.6, '#832424',
                        0.7, '#6F1B1B',
                        0.8, '#5B1212',
                        0.9, '#470909',
                        1, '#330000',
                    ],
                    // Adjust the heatmap radius by zoom level
                    'heatmap-radius': [
                        'interpolate', ['linear'], ['zoom'], 0, 2, 9, 20
                    ],
                    // Transition from heatmap to circle layer by zoom level
                    'heatmap-opacity': ['interpolate', ['linear'], ['zoom'], 7, 1, 15, 0]
                },
                //filter: ['<=', ['number', ['get', 'timestamp']], this.state.date]
            },
                'waterway-label'
            );

            map.addLayer({
                'id': 'covid-heatmap',
                'type': 'heatmap',
                'source': 'covid',
                'paint': {
                    // Increase the heatmap weight based on frequency and property magnitude
                    'heatmap-weight': [
                        'interpolate', ['linear'], ['number', ['get', 'newCases']], 0, 0, 20, 1
                    ],
                    // Increase the heatmap color weight weight by zoom level
                    // heatmap-intensity is a multiplier on top of heatmap-weight
                    'heatmap-intensity': [
                        'interpolate', ['linear'], ['zoom'], 0, 1, 9, 3
                    ],
                    // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
                    // Begin color ramp at 0-stop with a 0-transparancy color
                    // to create a blur-like effect.
                    'heatmap-color': [
                        'interpolate', ['linear'], ['heatmap-density'],
                        0, 'rgba(0,0,0,0)',
                        0.1, '#007083',
                        0.2, '#009a94',
                        0.3, '#00c385',
                        0.4, '#fdfd25',
                        0.5, '#fdd525',
                        0.6, '#fd9f25',
                        0.7, '#fd6625',
                        0.8, '#e6441c',
                        0.9, '#E34519',
                        1, '#c9240e'
                    ],
                    // Adjust the heatmap radius by zoom level
                    'heatmap-radius': [
                        'interpolate', ['linear'], ['zoom'], 0, 2, 9, 20
                    ],
                    // Transition from heatmap to circle layer by zoom level
                    'heatmap-opacity': ['interpolate', ['linear'], ['zoom'], 7, 1, 15, 0]
                },
                //filter: ['<=', ['number', ['get', 'timestamp']], this.state.date]
            },
                'waterway-label'
            );


            map.addLayer({
                'id': 'covid-point',
                'type': 'circle',
                'source': 'covid-cities-daily',
                'minzoom': 8,
                'paint': {
                    // Size circle radius by earthquake magnitude and zoom level
                    'circle-radius': [
                        'interpolate', ['linear'], ['zoom'],
                        7,
                        ['interpolate', ['linear'], ['number', ['get', 'totalCases']], 1, 1, 6, 4],
                        16,
                        ['interpolate', ['linear'], ['number', ['get', 'totalCases']], 1, 5, 6, 50]
                    ],
                    // Color circle by earthquake magnitude
                    'circle-color': [
                        'interpolate', ['linear'], ['number', ['get', 'totalCases']],
                        1, 'rgba(33,102,172,0)', 2, 'rgb(178,24,43)'
                    ],
                    'circle-stroke-color': 'white', 'circle-stroke-width': 1,
                    'circle-opacity': ['interpolate', ['linear'], ['zoom'], 7, 0, 8, 1]
                },
                //filter: ['==', ['number', ['get', 'timestamp']], this.state.date],
            },
                'waterway-label'
            );

            map.addLayer({
                'id': 'all-cities',
                'type': 'circle',
                'source': 'covid',
                'minzoom': 2.8,
                'paint': {
                    'circle-color': 'rgba(0,0,0,0)',
                    'circle-stroke-width': 0,
                },
            },
            );

        });

        map.on('idle', () => {
            this.onSourceLoadFinished && !this.state.animate && this.onSourceLoadFinished()

            if (this.state.loadState === 'loading') {
                this.setState({
                    loadState: 'loaded'
                })
                this.setInteractive(true, map)
                this.updateVisibleCities()
            }
        })
    }
}



export default MapBox;