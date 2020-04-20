import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import { formatDate, daysBetween, addDays } from '../common/date'
import CityDataItem from './CityDataItem'

mapboxgl.accessToken = 'pk.eyJ1IjoiYWVzdCIsImEiOiJjazkyNzZka2gwMnloM2xuNzZiMzEyODFrIn0.Yvk6wdCcwxvAB99OScpc2Q';

const CitiesList = ({ cities }) => {
    return (
        cities.length ?
            <div className='cityList'>{cities
                .sort((a, b) => a.totalCases - b.totalCases)
                .reverse()
                .map(data => (<CityDataItem
                    name={data.city}
                    state={data.state}
                    date={new Date(data.date)}
                    cases={data.totalCases}
                    deaths={data.deaths}
                    key={'cityItem' + data.city + data.state}
                />
                ))
            }</div> :
            <p>(Zoom para mais detalhes)</p>
    )
}

class MapBox extends Component {
    constructor(props) {
        super(props);

        let initialDate = new Date('2020-02-25')

        this.state = {
            lng: props.lng || 5,
            lat: props.lat || 34,
            zoom: props.zoom || 2,
            date: new Date(),
            sliderValue: daysBetween(new Date('2020-02-25'), new Date()),
            data: this.props.data,
            visibleCities: [],
            animate: false,
            initialDate: initialDate,
            maxDays: daysBetween(initialDate, new Date()),
            mapType: 'infected',
        };
    }

    getVisibleOnMap() {
        if (this.state.zoom < 5) {
            return []
        }
        let features = this.state.map.queryRenderedFeatures({ layers: ['all-cities'] });
        let cityData = {}

        if (features) {
            features = features.sort((a, b) => new Date(a.date) - new Date(b.date))

            for (let feature of features) {
                let city = feature.properties.city

                if (city === 'INDEFINIDA') {
                    city = city + '/' + feature.properties.state
                }

                if (!cityData.hasOwnProperty(city) && feature.properties.timestamp <= this.state.date.getTime()) {
                    cityData[city] = feature.properties
                }
            }
            return Object.keys(cityData).map(key => cityData[key]);
        }
        return []
    }

    animatedStep() {
        if (this.state.animate) {
            this.changeSlider(0)

            this.animateTimeout = setInterval(() => {
                if (this.state.sliderValue <= this.state.maxDays) {
                    this.changeSlider(this.state.sliderValue + 1)
                }
                if (this.state.sliderValue === this.state.maxDays) {
                    setTimeout(()=>{
                        this.changeSlider(0)
                    }, 2000)
                }
            }, 400);



        }
        else if (this.animateTimeout) {
            clearInterval(this.animateTimeout);
        }

    }

    changeSlider(value) {
        let dayNum = parseInt(value)
        let newDate = addDays(this.state.initialDate, dayNum)
        this.setState({
            sliderValue: dayNum,
            date: newDate,
            visibleCities: this.getVisibleOnMap()
        })
        this.state.map.setFilter('covid-heatmap', ['<=', ['number', ['get', 'timestamp']], newDate.getTime()])
        this.state.map.setFilter('covid-heatmap-death', ['<=', ['number', ['get', 'timestamp']], newDate.getTime()])
        this.state.map.setFilter('covid-point', ['==', ['number', ['get', 'timestamp']], newDate.getTime()])
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

    handleAnimateChange(event){
        this.setState({ animate: event.target.checked }, () => {
            this.animatedStep()
        })
    }

    render() {
        return (
            <div style={this.props.containerStyle}>
                <div className='console'>
                    <h1>Casos de COVID-19 no Brasil até o dia {formatDate(this.state.date)} (há {daysBetween(this.state.date, new Date())} dias)</h1>
                    <p>Fonte de dados: <a href='https://covid19br.wcota.me/'>Número de casos confirmados de COVID-19 no Brasil</a></p>
                    <div className='session sliderbar'>
                        <h2>Data {formatDate(this.state.date)}: <label className='active-hour'>{this.state.hour}</label></h2>
                        <form>
                            <label>
                                <input name="animate" type="checkbox" checked={this.state.animate}
                                    onChange={(e) => this.handleAnimateChange(e)}
                                />
                                Animar
                            </label>
                        </form>
                        <input className='slider row' type='range' min='0' max={this.state.maxDays} step='1' value={this.state.sliderValue}
                            onChange={(e) => this.changeSlider(e.target.value)}
                        />
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
                        <CitiesList cities={this.state.visibleCities} />
                    </div>
                </div>
                <div style={this.props.style} ref={el => this.mapContainer = el} />
            </div>
        )
    }

    componentDidMount() {
        const map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/aest/ck93dlpxn00v21imgp8zz3y6x',
            center: [this.state.lng, this.state.lat],
            zoom: this.state.zoom
        })

        this.setState({
            map: map
        })

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
                'data': 'http://localhost:5000/br/cities?response_type=geojson'
            })

            map.addSource('covid-cities-daily', {
                'type': 'geojson',
                'data': 'http://localhost:5000/br/cities-daily?response_type=geojson'
            })

            map.on('moveend', () => {
                this.setState({
                    visibleCities: this.getVisibleOnMap()
                })
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
                        0.1, '#ff9671',
                        0.15, '#ffc75f',
                        0.2, '#e24f4f',
                        0.4, '#c02f36', 
                        0.6, '#9e001f', 
                        0.8, '#7d0006', 
                        1, '#5e0000'
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
                        0, 'rgba(255,237,68,0)', 0.05, 'rgb(72,244,66)', 0.15, 'rgb(68,102,237)',
                        0.4, 'rgb(249,169,0)', 0.6, 'rgb(255,52,45)', 0.8, 'rgb(233,3,8)', 1, 'rgb(199,5,9)'
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
                'minzoom': 5,
                'paint': {
                    'circle-color': [
                        'interpolate', ['linear'], ['number', ['get', 'totalCases']],
                        1, 'rgba(33,102,172,0)',
                    ],
                    'circle-stroke-color': 'white', 'circle-stroke-width': 0,
                },
            },
                'waterway-label'
            );
            // Transition from heatmap to circle layer by zoom level
            /*map.addLayer({
                id: 'collisions',
                type: 'circle',
                source: 'car',
                paint: {
                    'circle-radius': [
                        'interpolate',
                        ['linear'],
                        ['number', ['get', 'newCases']],
                        0, 4,
                        5, 24
                    ],
                    'circle-color': [
                        'interpolate',
                        ['linear'],
                        ['number', ['get', 'newCases']],
                        0, '#2DC4B2',
                        1, '#3BB3C3',
                        2, '#669EC4',
                        3, '#8B88B6',
                        4, '#A2719B',
                        5, '#AA5E79'
                    ],
                    'circle-opacity': 0.8
                },
                //filter: ['==', ['number', ['get', 'Hour']], 12]
            });*/
        });

        //
        /*map.on('load', function () {
            // Add a geojson point source.
            // Heatmap layers also work with a vector tile source.
        }*/
    }
}

export default MapBox;