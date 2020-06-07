export default class MapDataExtractor {
    constructor() {
        this.processedData = undefined
        this.rawData = undefined
        this.untilDate = undefined
        this.filteredIndexes = undefined

        this.casesPlotData = undefined
        this.casesGrowthFactorPlotData = undefined
        this.deathsPlotData = undefined
        this.deathsGrowthRateData = undefined
        this.deathsOverCasesData = undefined
        this.newCasesData = undefined
        this.newDeathsData = undefined
        this.casesDeathsPerStateAndCityData = undefined
    }

    makeDataset(rawData, untilDate) {
        this.rawData = rawData
        this.untilDate = untilDate

        this.filteredIndexes = Object.keys(rawData)
            .filter(dt =>
                (untilDate.setHours(0, 0, 0, 0) > (new Date(dt).setHours(0, 0, 0, 0)))
            )
            .sort((a, b) => (new Date(a)) - (new Date(b)))


        this.processedData = this.filteredIndexes
            .map(key => rawData[key]
                .reduce(
                    (sum, city) => {
                        return {
                            date: key,
                            deaths: sum.deaths + city.deaths,
                            newCases: sum.newCases + city.newCases,
                            newDeaths: sum.newDeaths + city.newDeaths,
                            totalCases: sum.totalCases + city.totalCases,
                        }
                    }, {
                        date: undefined,
                        deaths: 0,
                        newCases: 0,
                        newDeaths: 0,
                        totalCases: 0,
                    })
            )
        return this.processedData
    }

    yGrowthFactor(array) {
        let growthFactor = []
        let pair = [ /*yesterday, today*/ ]

        for (let el of array) {
            pair.push(el)
            if (pair.length === 2) {
                let y = (pair[0].y === 0) ? (0) : ((pair[1].y / pair[0].y) - 1)

                growthFactor.push({
                    x: el.x,
                    y: y,
                })
                pair = [el] //today becomes yesterday
            }
        }
        return growthFactor
    }

    generateNewCasesPlotData() {
        return this.newCasesData = {
            "id": "# novos casos / dia",
            "color": "#61cdbb",
            "data": this.processedData.map(day => {
                return {
                    x: day.date,
                    y: day.newCases,
                }
            })
        }
    }

    generateNewDeathsPlotData() {
        return this.newDeathsData = {
            "id": "# novos óbitos / dia",
            "color": "#61cdbb",
            "data": this.processedData.map(day => {
                return {
                    x: day.date,
                    y: day.newDeaths,
                }
            })
        }
    }

    generateCasesPlotData() {
        return this.casesPlotData = {
            "id": "Casos",
            "color": "#61cdbb",
            "data": this.processedData.map(day => {
                return {
                    x: day.date,
                    y: day.totalCases,
                }
            })
        }
    }

    generateDeathsPlotData() {
        return this.deathsPlotData = {
            "id": "Óbitos",
            "color": "#f47560",
            "data": this.processedData.map(day => {
                return {
                    x: day.date,
                    y: day.deaths,
                }
            })
        }
    }

    generateCasesGrowthFactorPlotData() {
        const cases = this.casesPlotData && this.casesPlotData.data.length > 0 ? this.casesPlotData : this.generateCasesPlotData()
        return this.casesGrowthFactorPlotData = {
            id: 'GR casos',
            color: '#f47560',
            data: this.yGrowthFactor(cases.data)
        }
    }

    generateDeathsGrowthFactorPlotData() {
        const deaths = this.deathsPlotData && this.deathsPlotData.data.length > 0 ? this.deathsPlotData : this.generateDeathsPlotData()
        return this.deathsGrowthRateData = {
            id: 'GR óbitos',
            color: '#f47560',
            data: this.yGrowthFactor(deaths.data)
        }
    }

    generateDeathsOverCases() {

        const deaths = this.deathsPlotData && this.deathsPlotData.data.length > 0 ? this.deathsPlotData : this.generateDeathsPlotData()
        const cases = this.casesPlotData && this.casesPlotData.data.length > 0 ? this.casesPlotData : this.generateCasesPlotData()

        const deathsDates = deaths.data.map(el => el.x)
        const casesDates = cases.data.map(el => el.x)

        const dates = deathsDates.filter(e => casesDates.includes(e))

        const deathsData = deaths.data.filter(el => el.y > 0 && dates.includes(el.x))
        const casesData = cases.data.filter(el => el.y > 0 && dates.includes(el.x))

        let deathsOverCases = []

        for (let i = 0; i < deathsData.length; i++) {
            let casesDay = deathsData[i]
            let deathsDay = casesData[i]

            if (casesDay.y > 0 && deathsDay.y > 0) {
                deathsOverCases.push({
                    x: casesDay.x,
                    y: deathsDay.y / casesDay.y,
                })
            }
        }

        return this.deathsOverCasesData = {
            id: 'casos/óbitos',
            color: '#f47560',
            data: deathsOverCases
        }
    }

    /*
    generateChartData() {
        return {
            deaths: this.deathsPlotData && this.deathsPlotData.data.length > 0 ?
                this.deathsPlotData : this.generateDeathsPlotData(),
            cases: this.casesPlotData && this.casesPlotData.data.length > 0 ?
                this.casesPlotData : this.generateCasesPlotData(),
            casesGrowthFactor: this.casesGrowthFactorPlotData && this.casesGrowthFactorPlotData.data.length > 0 ?
                this.casesGrowthFactorPlotData : this.generateCasesGrowthFactorPlotData(),
            deathGrowthFactor: this.deathsGrowthRateData && this.deathsGrowthRateData.data.length > 0 ?
                this.deathsGrowthRateData : this.generateDeathsGrowthFactorPlotData(),
            deathsOverCases: this.deathsOverCasesData && this.deathsOverCasesData.data.length > 0 ?
                this.deathsOverCasesData : this.generateDeathsOverCases(),
            newCases: this.newCasesData && this.newCasesData.data.length > 0 ?
                this.newCasesData : this.generateNewCasesPlotData(),
            newDeaths: this.newDeathsData && this.newDeathsData.data.length > 0 ?
                this.newDeathsData : this.generateNewDeathsPlotData(),
            casesDeathsPerLocation: this.generateCasesDeathsPerStateAndCity(),
        }
    }
    */

    generateCasesDeathsPerStateAndCity(maxItems = 5) {

        let perState = {}
        let perCity = {}

        const perDayData = this.filteredIndexes.map(key => this.rawData[key])


        if (!perDayData || perDayData.length === 0) {
            return {
                states: {
                    data: [],
                    keys: [],
                    index: 'state',
                },
                cities: {
                    data: [],
                    keys: [],
                    index: 'city',
                },
            }
        }

        const lastDay = perDayData[perDayData.length - 1]

        for (let report of lastDay) {
            // state
            if (perState.hasOwnProperty(report.state)) {
                perState[report.state] = {
                    state: report.state,
                    "óbitos": report.deaths + perState[report.state]["óbitos"],
                    casos: report.totalCases + perState[report.state]['casos'],
                }
            } else {
                perState[report.state] = {
                    state: report.state,
                    "óbitos": report.deaths,
                    casos: report.totalCases,
                }
            }
            // city
            if (perCity.hasOwnProperty(report.city)) {
                perCity[report.city] = {
                    city: report.city,
                    "óbitos": report.deaths + perCity[report.city]["óbitos"],
                    casos: report.totalCases + perCity[report.city]['casos'],
                }
            } else {
                perCity[report.city] = {
                    city: report.city,
                    "óbitos": report.deaths,
                    casos: report.totalCases,
                    }
            }
        }

        const sortedPerState = Object.keys(perState)
            .map(key => perState[key])
            .sort( (a, b) =>  b['casos'] - a['casos'] )

        const sortedPerCity = Object.keys(perCity)
            .map(key => perCity[key])
            .sort( (a, b) =>  b['casos'] - a['casos'] )

        let filteredPerState = sortedPerState
        let filteredPerCity = sortedPerCity

        if(sortedPerState.length > maxItems){
            filteredPerState = sortedPerState.slice(0, maxItems)
        }

        if(sortedPerCity.length > maxItems){
            filteredPerCity = sortedPerCity.slice(0, maxItems)
        }
    
        return {
            states: {
                data: filteredPerState,
                keys: [ 'óbitos', 'casos' ],
                index: 'state',
            },
            cities: {
                data: filteredPerCity,
                keys: [ 'óbitos', 'casos' ],
                index: 'city',
            },
        }
    }

    removeZeroes(plotData) {
        return {
            ...plotData,
            ...{
                data: plotData.data.filter(el => el.y > 0)
            }
        }
    }

    makeTitle() {
        const visibleCitiesPerDate = this.rawData

        if (Object.keys(visibleCitiesPerDate).length === 0) return 'COVID-19 em ...'

        let data = visibleCitiesPerDate[Object.keys(visibleCitiesPerDate)[0]]


        let states = Array.from(new Set(data.map(city => city.state)))

        if ( /*data.length > 350 || */ states.length >= 25) return 'COVID-19 em todo o Brasil'
        if (data.length > 40) {
            let showStates = states.slice(0, 3)
            if (states.length - 3 > 1) return 'COVID-19 em parte de ' + showStates.join(', ') + ' e outros ' + (states.length - 3) + ' estados'
            if (states.length - 3 === 1) return 'COVID-19 em parte de ' + showStates.join(', ') + ' e outro estado'
            else {
                if (showStates.length === 3) return 'COVID-19 em ' + showStates.join(', ')
                if (showStates.length === 2) return 'COVID-19 em ' + showStates.join(' e ')
                else return 'COVID-19 em ' + showStates[0]
            }
        } else {
            let cities = data.map(city => city.city).filter(city => city !== 'CASO SEM LOCALIZAÇÃO DEFINIDA')
            let showCities = cities.slice(0, 3)

            if (cities.length - 3 > 1) return 'COVID-19 em ' + showCities.join(', ') + ' e outras ' + (cities.length - 3) + ' cidades'
            if (cities.length - 3 === 1) return 'COVID-19 em ' + showCities.join(', ') + ' e outra cidade'
            else {
                if (showCities.length === 3) return 'COVID-19 em ' + showCities.join(', ')
                if (showCities.length === 2) return 'COVID-19 em ' + showCities.join(' e ')
                else return 'COVID-19 em ' + showCities[0]
            }
        }
    }
}