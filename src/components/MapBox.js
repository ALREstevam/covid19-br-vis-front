import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl'
import ReactList from 'react-list'
import { formatDate, daysBetween, addDays } from '../common/date'
import CityDataItem from './CityDataItem'
import env from '../env/envVars'

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
            loadState: 'loading'
        };
    }


    renderCityListItem = (index, key) => {
        const data = this.state.renderableCities[index]

        return <CityDataItem
            name={data.city}
            state={data.state}
            date={new Date(data.date)}
            cases={data.totalCases}
            deaths={data.deaths}
            key={key}
        />

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

                if (!perDate.hasOwnProperty(feature.date)) {
                    perDate[feature.date] = []
                }
                perDate[feature.date].push(feature)


                if (!cityData.hasOwnProperty(city) && feature.timestamp <= this.state.date.getTime()) {
                    cityData[city] = feature
                }
            }
            return [Object.keys(cityData).map(key => cityData[key]), perDate];
        }
        return [[], []]
    }

    async updateVisibleCities() {
        let cityData, perDate
        [cityData, perDate] = this.getVisibleOnMap()

        this.setState({
            visibleCities: cityData,
            visibleCitiesPerDate: perDate,
            renderableCities: cityData.sort((a, b) => a.totalCases - b.totalCases).reverse()
        })
        
        this.props.onVisibleCitiesChange && this.state.loadState === 'loaded' && this.props.onVisibleCitiesChange(cityData, perDate)
    }

    animatedStep() {
        if (this.state.animate) {
            this.changeSlider(0)

            this.animateTimeout = setInterval(() => {
                if (this.state.sliderValue <= this.state.maxDays) {
                    this.changeSlider(this.state.sliderValue + 1)
                }
                else {
                    this.changeSlider(0)
                }
            }, 600);
        }
        else if (this.animateTimeout) {
            clearInterval(this.animateTimeout);
        }

    }

    changeSlider(value) {
        let dayNum = parseInt(value)
        let newDate = addDays(this.state.initialDate, dayNum)
        
        this.state.map.setFilter('covid-heatmap', ['<=', ['number', ['get', 'timestamp']], newDate.getTime()])
        this.state.map.setFilter('covid-heatmap-death', ['<=', ['number', ['get', 'timestamp']], newDate.getTime()])
        this.state.map.setFilter('covid-point', ['==', ['number', ['get', 'timestamp']], newDate.getTime()])

        this.setState({
            sliderValue: dayNum,
            date: newDate,
        })
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

    handleAnimateChange(event) {
        this.setState({ animate: event.target.checked }, () => {
            this.animatedStep()
        })
    }

    render() {

        const daysAgoStringMaker = () => {
            let daysAgo = daysBetween(this.state.date, new Date())
            if (daysAgo === 0) {
                return '(hoje)'
            }
            if (daysAgo === 1) {
                return '(ontem)'
            }
            else {
                return `(há ${daysAgo} dias)`
            }
        }


        return (
            <div style={this.props.containerStyle}>
                <div className='console'>
                    <h1 className='consoleTitle'>COVID-19 no Brasil até o dia {formatDate(this.state.date)} {daysAgoStringMaker()}</h1>
                    <p>Fonte de dados: <a href='https://covid19br.wcota.me/'>Número de casos confirmados de COVID-19 no Brasil</a></p>
                    <div className='session sliderbar'>
                        <strong>{formatDate(this.state.date)}: <label className='active-hour'>{this.state.hour}</label></strong>
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
                <div style={this.props.style} ref={el => this.mapContainer = el} />

            </div>
        )
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
                this.updateVisibleCities()
            }
        })
    }
}



export default MapBox;