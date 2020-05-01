export const perDate2NivoDataset = (visibleCitiesPerDate) => {
    let data = Object.keys(visibleCitiesPerDate)
        .sort((a, b) => (new Date(a)) - (new Date(b)))
        .map(key => visibleCitiesPerDate[key].reduce(
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
        }))

    let cases = {
        "id": "Casos",
        "color": "#61cdbb",
        "data": data.map(day => {
            return {
                x: day.date,
                y: day.totalCases,
            }
        })
    }

    let deaths = {
        "id": "Óbitos",
        "color": "#f47560",
        "data": data.map(day => {
            return {
                x: day.date,
                y: day.deaths,
            }
        })
    }

    function yGrowthFactor(array) {
        let growthFactor = []
        let pair = [/*yesterday, today*/]

        for (let el of array) {
            pair.push(el)
            if (pair.length === 2) {
                let y = pair[0].y === 0 ? 1 : pair[1].y / pair[0].y

                    growthFactor.push(
                        {
                            x: el.x,
                            y: y,
                        }
                    )
                pair = [el] //today becomes yesterday
            }
        }
        return growthFactor
    }


    let casesGrowthFactor = {
        "id": "Fator de crescimento - casos",
        "color": "#f47560",
        "data": yGrowthFactor(cases.data)
    }

    let deathGrowthFactor = {
        "id": "Fator de crescimento - óbitos",
        "color": "#f47560",
        "data": yGrowthFactor(deaths.data)
    }

    return {
        deaths: deaths,
        cases: cases,
        casesGrowthFactor: casesGrowthFactor,
        deathGrowthFactor: deathGrowthFactor,
    }
}

export const perDate2NivoChartTitle = (visibleCitiesPerDate, defaultTitle) => {

    if (Object.keys(visibleCitiesPerDate).length === 0) {
        return defaultTitle
    }

    let data = visibleCitiesPerDate[Object.keys(visibleCitiesPerDate)[0]]

    let states = Array.from(new Set(data.map(city => city.state)))

    if (data.length > 350 || states.length >= 25) {
        return 'todo o Brasil'
    }

    if (data.length > 40) {
        let showStates = states.slice(0, 3)

        if (states.length - 3 > 1) {
            return 'parte de ' + showStates.join(', ') + ' e outros ' + (states.length - 3) + ' estados'
        }
        if (states.length - 3 === 1) {
            return 'parte de ' + showStates.join(', ') + ' e outro estado'
        }
        else {
            if (showStates.length === 3) {
                return showStates.join(', ')
            }
            if (showStates.length === 2) {
                return showStates.join(' e ')
            }
            else {
                return showStates[0]
            }
        }
    }
    else {
        let cities = data.map(city => city.city).filter(city => city !== 'CASO SEM LOCALIZAÇÃO DEFINIDA')
        let showCities = cities.slice(0, 3)

        if (cities.length - 3 > 1) {
            return showCities.join(', ') + ' e outras ' + (cities.length - 3) + ' cidades'
        }
        if (cities.length - 3 === 1) {
            return showCities.join(', ') + ' e outra cidade'
        }
        else {
            if (showCities.length === 3) {
                return showCities.join(', ')
            }
            if (showCities.length === 2) {
                return showCities.join(' e ')
            }
            else {
                return showCities[0]
            }
        }
    }


}
